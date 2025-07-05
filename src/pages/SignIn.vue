<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="login-container">
        <h2 class="login-title">Sign In</h2>

        <form @submit.prevent="handleLogin">
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
              v-model="password"
              type="password"
              label="Password"
              label-placement="stacked"
              autocomplete="current-password"
              fill="outline"
            />
          </div>

          <ion-button expand="block" class="button-spacing" type="submit">
            Sign In
          </ion-button>
        </form>

        <ion-text color="medium" class="links">
          <p>
            <a @click.prevent="navigateToRegister" href="#">Register</a> |
            <a @click.prevent="navigateToForgot" href="#">Forgot Password?</a>
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
} from "@ionic/vue";

import { ref } from "vue";
import { useAuth } from '@/composables/useAuth'

const username = ref("");
const password = ref("");
const router = useIonRouter();
const { setUserType } = useAuth()

const handleLogin = () => {
  if (!username.value || !password.value) {
    console.log("Missing fields");
    return;
  }

  let userType = "tabs"; // default
  if (username.value === "admin" && password.value === "admin") {
    userType = "menu";
  }

  sessionStorage.setItem("userType", userType);

  console.log("Logged in as:", username.value, "| Type:", userType);

  setUserType(userType)
  if (userType === "tabs") {
    router.push("/tabs/home");
  } else {
    router.push("/landing");
  }
};

const navigateToRegister = () => {
  router.push("/register");
};

const navigateToForgot = () => {
  router.push("/forgot-password");
};
</script>

<style scoped>
ion-content {
  --background: var(--dashboard-bg, #f9fafa);
}

ion-input.form-input {
  --highlight-color-focused: var(--ion-color-primary);
  --border-color: var(--ion-color-primary);
  --border-radius: 8px;
  --padding-start: 12px;
  --padding-end: 12px;
  background: #fff;
  margin-bottom: 16px;
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
