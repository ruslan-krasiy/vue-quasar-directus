<script setup lang='ts'>
import useRegister from 'src/composable/useRegister';

  const {
    fullname,
    email,
    password,
    repeatPassword,
    submit,
    validateEmail,
  } = useRegister();

  defineOptions({
    name: 'RegisterForm'
  });
</script>

<template>
  <div class="q-pa-md shadow-box shadow-1 rounded-borders">
    <q-form @submit="submit" class="q-gutter-md login-form" autocomplete="off">
    <q-card-section>
      <div class="text-h6">Create New Account</div>
      <div class="text-subtitle1">
        Fill out the following form to create your new account.
      </div>
    </q-card-section>
    <q-input
      utocomplete="off"
      outlined
      label="Full name *"
      v-model="fullname"
      :rules="[
        (val) => (!!val || val.length === 0) || 'Full name must be filled in.',
      ]"
    />
    <q-input
      outlined
      label="Email *"
      v-model="email"
      autocomplete="off"
      lazy-rules
      :rules="[
        (val) => validateEmail(val) || 'Must be a valid email.'
      ]"
    />
    <q-input
      outlined
      label="Password *"
      autocomplete="off"
      v-model="password"
      type="password"
      :rules="[
        (val) => val.length >= 6 || 'Min 6 characters',
      ]"
    />
    <q-input
      outlined
      label="Confirm Password *"
      autocomplete="off"
      v-model="repeatPassword"
      :disable="!password || password.length < 6"
      type="password"
      :rules="[
        (val) =>
          (val && val === password) ||
          'Must match password.',
      ]"
    />

    <div>
      <q-btn size="lg" unelevated rounded color="primary full-width" type="submit" label="Sign in"/>
    </div>
    <q-separator inset />
    <p class="q-mt-md">If you already have an account just <router-link to="sign-in">Sign in</router-link></p>
  </q-form>
  </div>
</template>

<style>
  .login-form{
    min-width: 320px;
  }
</style>
