<template>
  <q-page class='row items-center justify-evenly'>
    <p v-if="state.loading">loading</p>
    <PublicationItem :item="publication" v-for="publication in state.data" :key="publication.id" />
  </q-page>
</template>

<script setup lang='ts'>
import useAllPublications from 'src/composable/useGetAllPublications';
import { onMounted } from 'vue';
import PublicationItem from './../components/publications/PublicationItem.vue';

const {state, fetchData} = useAllPublications();

onMounted(fetchData);

defineOptions({
  name: 'IndexPage'
});
</script>
