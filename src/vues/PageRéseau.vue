<template>
  <v-container class="text-center">
    <TitrePage
      :titre="t('pages.automatisations.titre')"
      :sous-titre="t('pages.automatisations.sousTitre')"
    />
    <v-data-table
      v-model:items-per-page="itemsParPage"
      :headers="entêtes"
      :items="itemsDonnées"
      item-value="id"
    ></v-data-table>
  </v-container>
</template>
<script setup lang="ts">
import type {ClientConstellation, réseau, tableaux} from '@constl/ipa';

import {VDataTable} from 'vuetify/labs/VDataTable';

import {inject, ref} from 'vue';

import {கிளிமூக்கை_உபயோகி} from '/@/plugins/kilimukku/kilimukku-vue';

import TitrePage from '/@/components/communs/TitrePage.vue';
import {enregistrerÉcoute} from '../components/utils';
import {
  clefTableau,
  idColDate,
  idColLatitude,
  idColLongitude,
  idColSalinité,
  idNuée,
} from '../consts.js';
import {computed} from 'vue';

const constl = inject<ClientConstellation>('constl');

const {useI18n} = கிளிமூக்கை_உபயோகி();
const {t} = useI18n();

// Données du réseau
const données = ref<réseau.élémentDeMembreAvecValid<tableaux.élémentBdListeDonnées>[]>();
enregistrerÉcoute(
  constl?.nuées.suivreDonnéesTableauNuée({
    idNuée,
    clefTableau,
    f: x => (données.value = x),
    nRésultatsDésirés: 1000, // Pour l'instant...éventuellement, rendre ça plus dynamique
  }),
);
const itemsDonnées = computed(() => {
  return données.value?.map(d => {
    return {
      auteur: d.idCompte,
      ...d.élément.données,
      id: d.élément.empreinte,
    };
  });
});
const entêtes = computed<{title: string; align: 'end' | 'center' | 'start'; key: string}[]>(() => {
  return [
    {
      title: 'ថ្ងៃខែឆ្នាំ',
      align: 'end',
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
