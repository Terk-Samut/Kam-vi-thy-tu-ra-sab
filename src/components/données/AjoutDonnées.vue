<template>
  <v-dialog
    v-model="dialogue"
  >
    <template #activator="{props}">
      <slot
        name="activator"
        v-bind="{props}"
      ></slot>
    </template>
  </v-dialog>
</template>
<script setup lang="ts">
import type {ClientConstellation, tableaux} from '@constl/ipa';

import { inject, ref } from 'vue';
import { clefTableau, idNuée, schémaDonnées } from '/@/consts';

const constl = inject<ClientConstellation>('constl');

 // Navigation
 const dialogue = ref(false);

const effacer = () => {

}

const ajouterÉlémentDonnées = async (élément: tableaux.élémentBdListeDonnées) => {
    await constl?.bds.ajouterÉlémentÀTableauUnique({
        schémaBd: schémaDonnées,
        idNuéeUnique: idNuée,
        clefTableau,
        vals: élément
    })
    effacer();
    dialogue.value = false;
}

</script>