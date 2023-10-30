<template>
  <v-container class="text-center">
    <TitrePage
      :titre="t('ទំព័រ.ទិន្នន័យ.ចំណងជើង')"
      :image="imgDonnées"
      :sous-titre="t('pages.favoris.sousTitre')"
    />
    <AjoutDonnees>
      <template #activator="{props}">
        <v-list-item
          v-bind="props"
          prepend-icon="mdi-plus"
        >
          <v-list-item-title> </v-list-item-title>
        </v-list-item>
      </template>
    </AjoutDonnees>
    <v-data-table
      v-model:items-per-page="itemsParPage"
      :headers="entêtes"
      :items="itemsDonnées"
      item-value="id"
    ></v-data-table>
  </v-container>
</template>
<script setup lang="ts">
import type {ClientConstellation, tableaux} from '@constl/ipa';
import {computed, inject, ref} from 'vue';
import { VDataTable } from 'vuetify/labs/VDataTable'

import {கிளிமூக்கை_உபயோகி} from '/@/plugins/kilimukku/kilimukku-vue';

import TitrePage from '/@/components/communs/TitrePage.vue';
import {utiliserImagesDéco} from '/@/composables/images';
import {enregistrerÉcoute} from '/@/components/utils';
import {clefTableau, idColDate, idColLatitude, idColLongitude, idColSalinité, idNuée, schémaDonnées} from '/@/consts';
import AjoutDonnees from '/@/components/données/AjoutDonnées.vue'

const constl = inject<ClientConstellation>('constl');

const {useI18n} = கிளிமூக்கை_உபயோகி();
const {t} = useI18n();
const {obtImageDéco} = utiliserImagesDéco();

const imgDonnées = obtImageDéco('automatisation');

// Mes données
const mesDonnées = ref<tableaux.élémentDonnées<tableaux.élémentBdListeDonnées>[]>();
enregistrerÉcoute(
  constl?.bds.suivreDonnéesDeTableauUnique({
    schémaBd: schémaDonnées,
    idNuéeUnique: idNuée,
    clefTableau,
    f: x => (mesDonnées.value = x),
  }),
);

const itemsDonnées = computed(() => {
  return mesDonnées.value?.map(d => {
    return {
      ...d.données,
      id: d.id,
    };
  });
});
const entêtes = computed<{title: string; align: 'end' | 'center' | 'start'; key: string}[]>(() => {
  return [
    {
      title: 'ថ្ងៃខែឆ្នាំ',
      align: 'start',
      key: idColDate,
    },
    {
      title: 'រយៈទទឹង',
      align: 'end',
      key: idColLatitude,
    },
    {
      title: 'រយៈបណ្តោយ',
      align: 'end',
      key: idColLongitude,
    },
    {
      title: 'ជាតិប្រៃ',
      align: 'end',
      key: idColSalinité,
    },
  ];
});

// Contrôles de page
const itemsParPage = ref(20);
</script>
