<template>
  <v-dialog v-model="dialogue">
    <template #activator="{props}">
      <slot
        name="activator"
        v-bind="{props}"
      ></slot>
    </template>
    <v-card
      class="mx-auto"
      :min-width="mdAndUp ? 500 : 300"
    >
      <v-card-item>
        <v-card-title class="text-h5 justify-space-between">
          <span>{{ titreCarte }}</span>
        </v-card-title>
        <v-card-subtitle> {{ sousTitreCarte }} </v-card-subtitle>
      </v-card-item>
      <v-card-text>
        <v-window
          v-model="étape"
          style="overflow-y: scroll"
        >
          <v-window-item :value="0">
            <v-text-field
              v-model="nom"
              :label="t('ស្វាគមន៍.ចាប់ផ្តើមគណនី.ឈ្មោះ.ជំនួយ')"
              :rules="règlesNouveauNom"
              variant="outlined"
            ></v-text-field>
          </v-window-item>
          <v-window-item :value="1">
            <ImageÉditable
              :editable="true"
              :src-image="srcImgProfil"
              :img-defaut="imgDefaut"
              :max-taille-image="MAX_TAILLE_IMAGE"
              :taille-avatar="150"
              @image-changee="(img?: ArrayBuffer) => imageChangée(img)"
            />
            <p class="mt-3 text-center text-caption">
              {{ t('ស្វាគមន៍.ចាប់ផ្តើមគណនី.រូបភាព.ព័ត៌មាន') }}
            </p>
          </v-window-item>
          <v-window-item :value="2">
            <p class="mb-4"> {{ t('ស្វាគមន៍.ចាប់ផ្តើមគណនី.ការពារទិន្នន័យ.ពន្យល់') }} </p>

            <div
              v-if="donnéesPersistées"
              class="text-center"
            >
              <v-btn
                class="mt-3 mx-3"
                variant="outlined"
                @click="étape++"
              >
                <v-icon start>mdi-check</v-icon>
                {{ t('ស្វាគមន៍.ចាប់ផ្តើមគណនី.ការពារទិន្នន័យ.បានការពាររួចហើយ') }}
              </v-btn>
            </div>
            <div
              v-else
              class="text-center"
            >
              <v-btn
                class="mt-3 mx-3"
                color="primary"
                variant="flat"
                @click="() => persisterDonnées()"
              >
                {{ t('ស្វាគមន៍.ចាប់ផ្តើមគណនី.ការពារទិន្នន័យ.ពាររួចហើយ') }}
              </v-btn>
              <v-btn
                class="mt-3 mx-3"
                variant="outlined"
                @click="étape++"
              >
                {{ t('ស្វាគមន៍.ចាប់ផ្តើមគណនី.ការពារទិន្នន័យ.កុំ​ការពារទេ') }}
              </v-btn>
            </div>
          </v-window-item>
          <v-window-item :value="3">
            <v-img
              class="mb-4"
              contain
              height="128"
              :src="srcImageLogo"
            ></v-img>
            <div class="text-center">
              <h3 class="text-h6 font-weight-light mb-2">
                {{ t('ស្វាគមន៍.ចាប់ផ្តើមគណនី.យល់ព្រម.សូមស្វាគមន៍') }}
              </h3>
              <p>
                <v-btn
                  class="mt-3"
                  variant="outlined"
                  :loading="enCréation"
                  @click="() => créerCompte()"
                >
                  {{ t('ស្វាគមន៍.ចាប់ផ្តើមគណនី.យល់ព្រម.បង្កើត') }}
                </v-btn>
              </p>
            </div>
          </v-window-item>
        </v-window>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn
          v-show="retourActif.visible"
          variant="text"
          :disabled="!retourActif.actif"
          @click="retour"
        >
          {{ t('ទូទៅ.មុន') }}
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          v-show="suivantActif.visible"
          color="primary"
          variant="flat"
          :disabled="!suivantActif.actif"
          @click="suivant"
        >
          {{ t('ទូទៅ.បន្ទាប់') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import type {ClientConstellation} from '@constl/ipa';

import {computed, ref, inject} from 'vue';
import {useDisplay} from 'vuetify';
import {isBrowser} from 'wherearewe';

import {MAX_TAILLE_IMAGE} from '/@/consts';

import {utiliserImagesDéco} from '/@/composables/images';

import ImageÉditable from '/@/components/communs/ImageEditable.vue';
import {கிளிமூக்கை_உபயோகி} from '/@/plugins/kilimukku/kilimukku-vue';
import {Nuchabäl} from 'nuchabal';

const {useI18n} = கிளிமூக்கை_உபயோகி();
const {t} = useI18n();

const {mdAndUp} = useDisplay();

const {obtImageDéco} = utiliserImagesDéco();
const constl = inject<ClientConstellation>('constl');
const nuchabäl = new Nuchabäl({});

// Navigation générale
const dialogue = ref(false);
const étape = ref(0);
const listeÉtapes = ['noms', 'image', 'persister', 'cestParti'] as const;

const suivant = () => {
  const é = listeÉtapes[étape.value];
  switch (é) {
    case 'image':
      étape.value = listeÉtapes.indexOf(isBrowser ? 'persister' : 'cestParti');
      break;

    default:
      étape.value++;
      break;
  }
};

const retour = () => {
  const é = listeÉtapes[étape.value];
  switch (é) {
    case 'cestParti':
      étape.value = listeÉtapes.indexOf(isBrowser ? 'persister' : 'image');
      break;
    default:
      étape.value--;
      break;
  }
};

const suivantActif = computed<{actif: boolean; visible: boolean}>(() => {
  const é = listeÉtapes[étape.value];
  switch (é) {
    case 'noms':
      return {actif: !!nom.value, visible: true};
    case 'cestParti':
      return {actif: false, visible: false};
    default:
      return {actif: true, visible: true};
  }
});

const retourActif = computed<{actif: boolean; visible: boolean}>(() => {
  const é = listeÉtapes[étape.value];
  switch (é) {
    case 'noms':
      return {actif: false, visible: false};
    case 'cestParti':
      return {actif: !enCréation.value, visible: true};
    default:
      return {actif: true, visible: true};
  }
});

const titreCarte = computed(() => {
  const é = listeÉtapes[étape.value];
  switch (é) {
    case 'noms':
      return t('ស្វាគមន៍.ចាប់ផ្តើមគណនី.ចំណងជើង.ឈ្មោះ');
    case 'image':
      return t('ស្វាគមន៍.ចាប់ផ្តើមគណនី.ចំណងជើង.រូបភាព');
    case 'persister':
      return t('ស្វាគមន៍.ចាប់ផ្តើមគណនី.ចំណងជើង.ការពារ');
    case 'cestParti':
      return t('ស្វាគមន៍.ចាប់ផ្តើមគណនី.ចំណងជើង.យល់ព្រម');
    default:
      return '';
  }
});

const sousTitreCarte = computed(() => {
  const é = listeÉtapes[étape.value];
  switch (é) {
    default:
      return '';
  }
});

// Noms
const nom = ref<string>();
const règlesNouveauNom = computed<string[] | undefined>(() => {
  if (!nom.value?.length) return undefined;
  const exprégÉcriture = nuchabäl.rutzibTzibanem({runuk: 'ខ្មែរ'});
  if (!exprégÉcriture) return;
  const erreurLangue = !nom.value.match(new RegExp(exprégÉcriture, 'g'));

  return erreurLangue ? [t('ទូទៅ.កំហុសភាសា', {langue: nom.value})] : undefined;
});

// Image
const imageSélectionnée = ref<ArrayBuffer>();
const srcImgProfil = computed(() => {
  if (imageSélectionnée.value) {
    return URL.createObjectURL(new Blob([imageSélectionnée.value], {type: 'image'}));
  } else {
    return undefined;
  }
});
const imgDefaut = obtImageDéco('profil');

const imageChangée = (img?: ArrayBuffer) => {
  imageSélectionnée.value = img;
};

// Persister les données
const persisterDonnées = async () => {
  const persisté = await navigator.storage.persist();
  if (persisté) {
    suivant();
    donnéesPersistées.value = true;
  }
};
const donnéesPersistées = ref(false);
navigator.storage.persisted().then(x => (donnéesPersistées.value = x));

// Création ou connexion compte
const srcImageLogo = ref<string>();
import('/@/assets/logo.svg').then(x => (srcImageLogo.value = x.default));

const enCréation = ref(false);
const créerCompte = async () => {
  enCréation.value = true;
  if (!constl || !nom.value) return;
  await constl.profil.sauvegarderNom({langue: 'ខ្មែរ', nom: nom.value});
  if (imageSélectionnée.value) {
    await constl.profil?.sauvegarderImage({image: imageSélectionnée.value});
  }
  enCréation.value = false;
};

const idCompte = ref();
constl?.suivreIdCompte({f: id => (idCompte.value = id)});
</script>
