<template>
  <v-card class="text-start">
    <v-card-text>
      <p class="px-0 mb-0 text-h6">
        {{ t('pages.compte.compte.mesDispositifs') }}
      </p>
      <v-divider />
      <v-list>
        <ItemDispositif
          v-for="id in dispositifs"
          :key="id"
          :id-dispositif="id"
          :vu-a="statutDispositifs?.find(d => d.infoDispositif.idDispositif === id)?.vuÀ"
        />
      </v-list>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
import type {réseau} from '@constl/ipa';
import type {ClientConstellation} from '@constl/ipa';

import {ref, inject} from 'vue';

import {கிளிமூக்கை_உபயோகி} from '/@/plugins/kilimukku/kilimukku-vue';

import ItemDispositif from '/@/components/membres/ItemDispositif.vue';

import {enregistrerÉcoute} from '/@/components/utils';

const constl = inject<ClientConstellation>('constl');

const {useI18n} = கிளிமூக்கை_உபயோகி();
const {t} = useI18n();

// Dispositifs
const dispositifs = ref<string[]>();
enregistrerÉcoute(
  constl?.suivreDispositifs({
    f: x => (dispositifs.value = x),
  }),
);

const statutDispositifs = ref<réseau.statutDispositif[]>();
enregistrerÉcoute(
  constl?.réseau?.suivreConnexionsDispositifs({
    f: x => (statutDispositifs.value = x),
  }),
);
</script>
