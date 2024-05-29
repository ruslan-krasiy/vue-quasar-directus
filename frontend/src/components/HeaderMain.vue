<template>
    <q-header>
      <q-toolbar>
        <h5 class="text-h5 q-mr-auto q-my-none">
          Quasar App
        </h5>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
      </q-toolbar>
    </q-header>
    <q-drawer
        side="right"
        v-model='drawer'
        bordered
        overlay
        :width="200"
        :breakpoint="500"
      >
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list padding>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="inbox" />
              </q-item-section>

              <q-item-section>
                Inbox
              </q-item-section>
            </q-item>

            <q-item active clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="star" />
              </q-item-section>

              <q-item-section>
                Star
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="send" />
              </q-item-section>

              <q-item-section>
                Send
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="drafts" />
              </q-item-section>

              <q-item-section>
                Drafts
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-ripple  @click="handleSignOut">
              <q-item-section avatar>
                <q-icon name="logout" />
              </q-item-section>

              <q-item-section>
                Logout
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="text-weight-bold">{{ user?.displayName }}</div>
            <div>{{ user?.email }}</div>
          </div>
        </q-img>
      </q-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { User, signOut} from 'firebase/auth';
import {auth} from 'boot/firebase';

import { useRouter } from 'vue-router';

const drawer = ref<boolean>(false);
const router = useRouter();

const handleSignOut = () => {
  signOut(auth).then(()=> router.push('/sign-in'));
}


defineProps<{user: User | null}>();

defineOptions({
  name: 'HeaderMain'
})
</script>
