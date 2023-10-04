<template>
  <v-container class="text-center">
    <TitrePage
      :titre="t('pages.automatisations.titre')"
      :image="imgAutomatisations"
      :sous-titre="t('pages.automatisations.sousTitre')"
    />
    
  </v-container>
</template>
<script setup lang="ts">
import type {automatisation} from '@constl/ipa';
import type {ClientConstellation} from '@constl/ipa';

import {inject, ref} from 'vue';

import {கிளிமூக்கை_உபயோகி} from '/@/plugins/kilimukku/kilimukku-vue';

import TitrePage from '/@/components/communs/TitrePage.vue';
import {utiliserImagesDéco} from '/@/composables/images';
import {enregistrerÉcoute} from '../components/utils';

const constl = inject<ClientConstellation>('constl');

const {useI18n} = கிளிமூக்கை_உபயோகி();
const {t} = useI18n();
const {obtImageDéco} = utiliserImagesDéco();

const imgAutomatisations = obtImageDéco('automatisation');

// Automatisations
const automatisations = ref<automatisation.SpécificationAutomatisation[]>();
enregistrerÉcoute(
  constl?.automatisations.suivreAutomatisations({
    f: x => (automatisations.value = x),
  }),
);
</script>
