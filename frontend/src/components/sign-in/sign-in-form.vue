<script setup lang='ts'>
  import useSignIn from '../../composable/useSignIn';

  const {email, password, error, submit} = useSignIn();
</script>

<template>
  <div class="q-pa-md shadow-box shadow-1 rounded-borders">
   <q-form @submit="submit" class="q-gutter-md login-form">
    <q-input outlined v-model="email" type="email" label="Email address"/>
    <q-input outlined v-model="password" type="password" label="Password"/>
    <div>
      <q-btn size="lg" unelevated rounded color="primary full-width" type="submit" label="Sign in"/>
    </div>
  </q-form>
  </div>
  <p v-if="error">{{ error }}</p>
</template>

<style>
  .login-form{
    min-width: 320px;
  }
</style>
