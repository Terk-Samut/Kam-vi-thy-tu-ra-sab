<template>
  <v-chip
    variant="outlined"
    size="small"
  >
    {{ code || t('communs.auto') }}
    {{ numéroFormatté }}
  </v-chip>
</template>
<script setup lang="ts">
import {கிளிமூக்கை_உபயோகி} from '/@/plugins/kilimukku/kilimukku-vue';
import {utiliserNumération} from '/@/plugins/localisation/localisation';

const props = defineProps<{code: string}>();

const {useI18n} = கிளிமூக்கை_உபயோகி();
const {t} = useI18n();

const {formatterChiffre} = utiliserNumération();

const numéroFormatté = formatterChiffre(123.45, props.code);
</script>
