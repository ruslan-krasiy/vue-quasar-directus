<template>
  <span>{{ description }}</span>
  <button v-if='isLong' @click='toggleHandler' class='description-btn text-grey-5 text-weight-regular'>
  {{ showAll ? ' Less ...' : ' ... more' }}
  </button>
</template>

<style>
.description-btn {
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;
}
</style>

<script setup lang='ts'>
import { onMounted, ref } from 'vue';

const props = defineProps<{text: string}>();
const isLong = props.text.length > 100;

const description = ref<string>('');

const showAll = ref<boolean>(false);

const toggleHandler = () => {
  showAll.value = !showAll.value
  description.value = showAll.value ? props.text : cutText(props.text);
}

const cutText = (str: string): string => {
  const arrSting = str.split(' ');
  return arrSting.slice(0, 20).join(' ');
}

onMounted(() => {
  description.value = isLong ? cutText(props.text) : props.text
})

defineOptions({
  name: 'DescriptionPublication'
})

</script>
