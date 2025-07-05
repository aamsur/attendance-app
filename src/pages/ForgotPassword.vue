<template>
    <ion-page>
      <ion-content class="ion-padding">
        <div class="login-container">
          <h2 class="login-title">Reset Password</h2>

          <div class="ion-margin-bottom">
            <ion-input
              v-model="email"
              type="email"
              label="Email Address"
              label-placement="stacked"
              autocomplete="email"
              fill="outline"
            />
          </div>

          <ion-button expand="block" class="button-spacing" @click="handleReset">
            Send Reset Link
          </ion-button>

          <ion-text color="medium" class="links">
            <p>
              <a @click.prevent="goToSignIn" href="#">Back to Sign In</a>
            </p>
          </ion-text>
        </div>
      </ion-content>
    </ion-page>
  </template>

  <script setup lang="ts">
  import {
    IonPage,
    IonContent,
    IonInput,
    IonButton,
    IonText,
    useIonRouter,
  } from '@ionic/vue';
  import { ref } from 'vue';

  const email = ref('');
  const router = useIonRouter();

  const handleReset = () => {
    console.log('Reset link sent to:', email.value);
    router.push('/signin');
  };

  const goToSignIn = () => {
    router.push('/signin');
  };
  </script>

  <style scoped>
  .login-container {
    max-width: 400px;
    margin: auto;
    padding-top: 100px;
    padding-left: 16px;
    padding-right: 16px;
  }

  .login-title {
    text-align: center;
    margin-bottom: 30px;
    font-size: 28px;
    font-weight: 600;
  }

  .links {
    text-align: center;
    margin-top: 1rem;
  }

  a {
    text-decoration: none;
    color: var(--ion-color-primary);
    font-weight: 500;
  }

  .button-spacing {
    margin-top: 24px;
  }
  </style>
