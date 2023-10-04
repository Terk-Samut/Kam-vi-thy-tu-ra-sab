<template>
  <v-container class="text-center">
    <TitrePage :titre="t('ទូទៅ.ទឹកសមុទ្រ')" />
  </v-container>
</template>

<script setup lang="ts">
import TitrePage from '/@/components/communs/TitrePage.vue';
import {கிளிமூக்கை_உபயோகி} from '/@/plugins/kilimukku/kilimukku-vue';

const {useI18n} = கிளிமூக்கை_உபயோகி();
const {t} = useI18n();
</script>
