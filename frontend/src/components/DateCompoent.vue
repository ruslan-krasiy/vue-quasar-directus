<template>
  <span>{{ dateISO }}</span>
</template>

<script setup lang="ts">
import useDate from 'src/composable/useDate';

  const props = defineProps<{date: string}>();
  const dateISO = useDate(props.date);


defineOptions({
  name: 'DateComponent'
})
</script>
