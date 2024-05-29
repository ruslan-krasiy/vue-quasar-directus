<template>
  <q-layout view="hHh lpR fFf">
    <HeaderMain :user="loggedUser" />
    <q-page-container class="main">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { User, onAuthStateChanged } from 'firebase/auth';
import {auth} from 'boot/firebase';

import HeaderMain from 'src/components/HeaderMain.vue';

const loggedUser = ref<User | null>(null)

onMounted(()=>{
  onAuthStateChanged(auth, (user)=>{
    loggedUser.value = user
  })
});

defineOptions({
  name: 'MainLayout'
});
</script>
