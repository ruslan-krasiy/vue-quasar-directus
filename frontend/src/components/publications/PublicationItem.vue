<template>
  <div>
    <div>
      <span>{{ item.autor }}</span>
      <span>{{ item.date_created }}</span>
    </div>
    <div>
      <img :src='imgUrl' alt='Publication image'/>
    </div>
    <div>
      <span>{{ item.likes }}</span>
    </div>
    <div>
      <span>{{ item.autor }}</span>
      <h2>{{ item.title }}</h2>
    </div>
    <p>{{ item.content }}</p>

  </div>
</template>


<script setup lang='ts'>
import type {Publication} from './../../interfaces/publication.interface';
import { storage } from 'src/firebase-config';
import { ref, getDownloadURL } from 'firebase/storage';
import { onMounted, ref as vueRef } from 'vue';

const props = defineProps<{item: Publication}>();

const imgUrl = vueRef('');

onMounted(async ()=>{
  imgUrl.value = await getDownloadURL(ref(storage, props.item.image || 'no-image.jpg'))
});

console.log(imgUrl)
defineOptions({
  name: 'PublicationItem'
});
</script>
