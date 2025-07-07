<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="login-container">
        <h2 class="login-title">Register</h2>

        <form @submit.prevent="handleRegister">
          <div class="ion-margin-bottom">
            <ion-input
              class="form-input"
              v-model="username"
              type="text"
              label="Username"
              label-placement="stacked"
              autocomplete="username"
              fill="outline"
            />
          </div>

          <div class="ion-margin-bottom">
            <ion-input
              class="form-input"
              v-model="email"
              type="email"
              label="Email"
              label-placement="stacked"
              autocomplete="email"
              fill="outline"
            />
          </div>

          <div class="ion-margin-bottom">
            <ion-input
              class="form-input"
              v-model="password"
              type="password"
              label="Password"
              label-placement="stacked"
              autocomplete="new-password"
              fill="outline"
            />
          </div>

          <ion-button expand="block" class="button-spacing" type="submit">
            Create Account
          </ion-button>
        </form>

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

const username = ref('');
const email = ref('');
const password = ref('');
const router = useIonRouter();

const handleRegister = () => {
  if (!username.value || !email.value || !password.value) {
    console.log('❌ Missing fields');
    return;
  }

  console.log('✅ Registering:', username.value, email.value);
  router.push('/signin');
};

const goToSignIn = () => {
  router.push('/signin');
};
</script>

<style scoped>
ion-content {
  --background: var(--dashboard-bg, #f9fafa);
}

ion-input.form-input {
  --border-radius: 8px;
  margin-bottom: 16px;
}

ion-input.form-input:hover {
  --border-color: var(--ion-color-primary);
  --border-radius: 8px;
}

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

.button-spacing {
  margin-top: 24px;
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
</style>
