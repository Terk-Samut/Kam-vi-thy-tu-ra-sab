<template>
  <v-container class="text-center">
    <TitrePage
      :titre="t('ទំព័រ.ទិន្នន័យ.ចំណងជើង')"
      :image="imgFavoris"
      :sous-titre="t('pages.favoris.sousTitre')"
    />
    <AjoutDonnees>
      <template #activator="{props}">
        <v-list-item v-bind="props" prepend-icon="mdi-plus">
          <v-list-item-title>
            
          </v-list-item-title>
        </v-list-item>
      </template>
    </AjoutDonnees>
    {{ mesDonnées }}
  </v-container>
</template>
<script setup lang="ts">
import type {ClientConstellation, tableaux} from '@constl/ipa';
import {inject, ref} from 'vue';

import {கிளிமூக்கை_உபயோகி} from '/@/plugins/kilimukku/kilimukku-vue';

import TitrePage from '/@/components/communs/TitrePage.vue';
import {utiliserImagesDéco} from '/@/composables/images';
import {enregistrerÉcoute} from '/@/components/utils';
import { clefTableau, idNuée, schémaDonnées } from '/@/consts';
import AjoutDonnees from '/@/components/données/AjoutDonnées.vue';

const constl = inject<ClientConstellation>('constl');

const {useI18n} = கிளிமூக்கை_உபயோகி();
const {t} = useI18n();
const {obtImageDéco} = utiliserImagesDéco();

const imgFavoris = obtImageDéco('automatisation');

// Mes favoris
const mesDonnées = ref<tableaux.élémentDonnées<tableaux.élémentBdListeDonnées>[]>();
enregistrerÉcoute(
  constl?.bds.suivreDonnéesDeTableauUnique({
    schémaBd: schémaDonnées,
    idNuéeUnique: idNuée,
    clefTableau,
    f: x => (mesDonnées.value = x),
  }),
);
</script>
