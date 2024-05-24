<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <h5 class="text-h5 q-mr-auto q-my-none">
          Quasar App
        </h5>
        <div v-if="loggedUser">
          <span class="q-mr-md">{{ loggedUser.email }}</span>
          <q-btn unelevated label="Logout" @click="handleSignOut"/>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { User, getAuth, onAuthStateChanged, signOut} from 'firebase/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const loggedUser = ref<User | null>(null)

const handleSignOut = () => {
  const auth = getAuth();
  signOut(auth).then(()=> router.push('/sign-in'));
}


onMounted(()=>{
  const auth = getAuth();
  onAuthStateChanged(auth, (user)=>{
    loggedUser.value = user
  })
});

defineOptions({
  name: 'MainLayout'
});
</script>
