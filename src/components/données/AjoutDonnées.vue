<template>
  <v-dialog v-model="dialogue">
    <template #activator="{props}">
      <slot
        name="activator"
        v-bind="{props}"
      ></slot>
    </template>
    <v-card
      :width="mdAndUp ? 700 : 300"
      class="mx-auto"
    >
      <v-card-item>
        <v-card-title> Entrée de données </v-card-title>
        <v-card-subtitle> Contribuer de nouvelles données au projet </v-card-subtitle>
      </v-card-item>
      <v-divider />
      <v-card-text>
        <v-text-field
          v-model="lat"
          label="lat"
          variant="outlined"
        />
        <v-text-field
          v-model="long"
          label="long"
          variant="outlined"
        />
        <v-text-field
          v-model="temps"
          label="temps"
          variant="outlined"
        />
        <v-text-field
          v-model="salinité"
          label="salinité"
          variant="outlined"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="fermer">Effacer</v-btn>
        <v-btn
          color="primary"
          variant="outlined"
          :disabled="!élémentPrêt"
          @click="() => ajouterÉlémentDonnées()"
        >
          Sauvegarder
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import type {ClientConstellation, tableaux} from '@constl/ipa';

import {computed, inject, ref} from 'vue';
import {useDisplay} from 'vuetify';

import {clefTableau, idColDate, idColLatitude, idColLongitude, idColSalinité, idNuée, schémaDonnées} from '/@/consts';
import {
  DonnéesSalinité,
} from '../types';

const {mdAndUp} = useDisplay();

const constl = inject<ClientConstellation>('constl');

// Navigation
const dialogue = ref(false);

// Données
const lat = ref<number>();
const long = ref<number>();
const temps = ref(Date.now());
const salinité = ref<number>();

// Sauvegarde données
const fermer = () => {
  lat.value = undefined;
  long.value = undefined;
  temps.value = undefined;
  salinité.value = undefined;
  dialogue.value = false;
};

const élémentPrêt = computed(() => {
  if (![lat, long, temps, salinité].some(v => v.value === undefined)) {
    return {
      [idColLatitude]: lat.value,
      [idColLongitude]: long.value,
      [idColDate]: temps.value,
      [idColSalinité]: salinité.value,
    } as DonnéesSalinité;
  }
  return undefined;
});

const ajouterÉlémentDonnées = async () => {
  const élément = élémentPrêt.value;
  if (élément)
    await constl?.bds.ajouterÉlémentÀTableauUnique({
      schémaBd: schémaDonnées,
      idNuéeUnique: idNuée,
      clefTableau,
      vals: élément,
    });
  fermer();
};
</script>
