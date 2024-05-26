<template>
    <div class="fullscreen text-center q-pa-md flex flex-center column">
      <RegisterForm />

    </div>
  <div>

  </div>
</template>

<script setup lang="ts">
import RegisterForm from 'src/components/register/register-form.vue';

defineOptions({
  name: 'RegisterPage'
});
</script>
