<template>
    <div class="fullscreen text-center q-pa-md flex flex-center column">
      <h3>Sign In</h3>
      <SignInForm />
      <p class="q-mt-md">If don't have an account yet you need to <router-link to="register">register</router-link></p>
    </div>
  <div>

  </div>
</template>

<script setup lang="ts">
import SignInForm from 'src/components/sign-in/sign-in-form.vue';

defineOptions({
  name: 'SignInPage'
});
</script>
