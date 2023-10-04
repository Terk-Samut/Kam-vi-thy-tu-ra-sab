<template>
  <v-dialog
    v-model="dialogue"
    :max-width="mdAndUp ? 500 : 300"
  >
    <template #activator="{props: propsActivateur}">
      <slot
        name="activator"
        v-bind="{props: propsActivateur}"
      ></slot>
    </template>
    <v-card>
      <v-card-item>
        <v-card-title>
          <ImageProfil :id="id" />
          <span class="mx-4">{{ nomTraduit || t('communs.anonyme') }}</span>
          <JetonConfiance
            v-if="mdAndUp"
            :id="id"
            style-jeton="jeton"
          />
        </v-card-title>
      </v-card-item>
      <v-card-text style="overflow-y: scroll">
        <JetonConfiance
          v-if="!mdAndUp"
          :id="id"
          style-jeton="jeton"
        />
        <division-carte
          :titre="t('membres.contacts')"
          :en-attente="!contacts"
        />
        <span v-if="contacts">
          <menu-contact-membre
            v-for="{type, contact} in contacts"
            :key="type"
            :type="type"
            :contact="contact"
          >
            <template #activator="{props: propsActivateur}">
              <jeton-contact-membre
                v-bind="propsActivateur"
                :type="type"
                :contact="contact"
                size="small"
              />
            </template>
          </menu-contact-membre>
        </span>
        <p
          v-else
          class="text-disabled"
        >
          {{ t('membres.aucunContact') }}
        </p>
      </v-card-text>
      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn
          variant="flat"
          @click="dialogue = false"
        >
          {{ t('communs.fermer') }} <v-icon end>mdi-close</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import type {ClientConstellation} from '@constl/ipa';

import {ref, inject} from 'vue';

import {utiliserLangues} from '/@/plugins/localisation/localisation';
import {enregistrerÉcoute} from '/@/components/utils';
import {கிளிமூக்கை_உபயோகி} from '/@/plugins/kilimukku/kilimukku-vue';

import ImageProfil from '../communs/ImageProfil.vue';
import {useDisplay} from 'vuetify/lib/framework.mjs';
import DivisionCarte from '../communs/DivisionCarte.vue';
import JetonConfiance from './JetonConfiance.vue';
import MenuContactMembre from './MenuContactMembre.vue';

const props = defineProps<{id: string}>();

const constl = inject<ClientConstellation>('constl');

const {useI18n} = கிளிமூக்கை_உபயோகி();
const {t} = useI18n();
const {mdAndUp} = useDisplay();

// Navigation
const dialogue = ref(false);

// Nom
const {traduireNom} = utiliserLangues();

const noms = ref<{[lng: string]: string}>({});
const nomTraduit = traduireNom(noms);

enregistrerÉcoute(
  constl?.profil.suivreNoms({
    f: x => (noms.value = x),
  }),
);

// Contacts
const contacts = ref<{type: string; contact: string}[]>();
enregistrerÉcoute(
  constl?.profil.suivreContacts({
    f: x => (contacts.value = x),
    idCompte: props.id,
  }),
);
</script>
