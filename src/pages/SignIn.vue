<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="login-container">
        <h2 class="login-title">Sign In Presensia</h2>

        <form @submit.prevent="handleLogin">
          <div class="input-wrapper">
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

          <div class="input-wrapper">
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
import { useHttp } from "@/composables/useHttp";

const username = ref("");
const password = ref("");
const router = useIonRouter();
const { setUserType } = useAuth()
import Cookie from "js-cookie";

const { $http_post } = useHttp();

const handleLogin = async () => {
  if (!username.value || !password.value) {
    console.log("Missing fields");
    return;
  }

  try {
    const response = await $http_post("auth/sign-in", {
      email: username.value,
      password: password.value,
    });

    const { access_token, token_type, user } = response.data.data;

    if (!access_token) {
      console.error("Invalid login");
      return;
    }

    // ✅ Simpan token ke cookie (agar api.js bisa ambil)
    Cookie.set("auth.token", access_token, {
      expires: 1, // 1 day
      secure: true,
      sameSite: "Lax",
    });

    // Simpan user-info (opsional)
    localStorage.setItem("user", JSON.stringify(user));

    // Arahkan ke halaman
    setUserType("tabs");
    router.push("/tabs/check-in");
  } catch (error) {
    console.error("Login failed:", error?.response?.data?.message || error.message);
  }
};

const navigateToRegister = () => router.push("/register");
const navigateToForgot = () => router.push("/forgot-password");
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
