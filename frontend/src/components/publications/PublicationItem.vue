<template>
  <q-card square class="custom-card">
    <q-item>
      <q-item-section>
        <q-item-label>{{ item.autor }}</q-item-label>
        <q-item-label caption><DateCompoent :date="item.date_created" /></q-item-label>
      </q-item-section>
    </q-item>
    <q-img
      :src='imgUrl'
      alt='Publication image'
      fit="cover"
      :ratio="16/9"/>
    <q-card-actions>
      <q-btn flat round :color="isActiveBtn ? 'red' : 'grey'" icon="favorite" size="sm" @click="likeshandler" :disable="!isActiveBtn"/>
      <span class="text-subtitle2" v-if="publication.likes && publication.likes.length > 0">{{ publication.likes.length }}</span>
    </q-card-actions>
    <q-card-section class="q-pt-none">

      <div class="text-body2 text-weight-light">
        <div class="text-weight-medium q-mr-sm">{{ item.title }}</div>
        <DescriptionPublication v-if="item.content" :text="item.content"/>
      </div>
    </q-card-section>
  </q-card>
</template>

<style>
.custom-card {
  margin: 0 auto .75em;
  max-width: 678px;
  box-shadow: 0 0 9px 0 #ddd;
}
</style>

<script setup lang='ts'>
import usePublication from 'src/composable/usePublication';
import type {Publication} from './../../interfaces/publication.interface';

import DateCompoent from '../DateCompoent.vue';
import DescriptionPublication from './DescriptionPublication.vue';

const props = defineProps<{item: Publication}>();

const {
  imgUrl,
  isActiveBtn,
  likeshandler,
  publication
} = usePublication(props.item);

defineOptions({
  name: 'PublicationItem'
});
</script>
