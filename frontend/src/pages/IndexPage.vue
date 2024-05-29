<template>
  <q-page class='row items-center justify-evenly'>
    <q-inner-loading
        :showing="state.loading"
        label="Please wait..."
        label-class="text-teal"
        label-style="font-size: 1.1em"
      />
    <div class="publications q-pb-md">
      <PublicationItem :item="publication" v-for="publication in state.data" :key="publication.id" />
    </div>
  </q-page>
</template>

<style>
.publications{
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>

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
