<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="login-container">
        <h2 class="login-title">Sign In Presensia</h2>

        <form @submit.prevent="handleLogin">
          <div class="input-wrapper">
            <ion-input
              class="form-input"
              :class="{ invalid: !username && errorMessage }"
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
              :class="{ invalid: !password && errorMessage }"
              v-model="password"
              type="password"
              label="Password"
              label-placement="stacked"
              autocomplete="current-password"
              fill="outline"
            />
          </div>

          <transition name="fade-slide">
            <ion-text v-if="errorMessage" color="danger" class="error-text">
              <IonIcon
                :icon="alertCircleOutline"
                style="margin-right: 6px; vertical-align: middle"
              />
              {{ errorMessage }}
            </ion-text>
          </transition>
          <ion-button
            expand="block"
            class="button-spacing"
            type="submit"
            :disabled="isSubmitting"
          >
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
import { IonIcon } from "@ionic/vue";
import { alertCircleOutline } from "ionicons/icons";
import { ref } from "vue";
import { useAuth } from "@/composables/useAuth";
import { useHttp } from "@/composables/useHttp";
import Cookie from "js-cookie";

const router = useIonRouter();
const { setUserType } = useAuth();

const username = ref("");
const password = ref("");
const errorMessage = ref("");
const isSubmitting = ref(false);

const { $http_post } = useHttp();
const handleLogin = async () => {
  errorMessage.value = "";

  if (!username.value || !password.value) {
    errorMessage.value = "Email dan password harus diisi.";
    return;
  }

  isSubmitting.value = true;

  try {
    const response = await $http_post("auth/sign-in", {
      email: username.value,
      password: password.value,
    });

    const { access_token, token_type, user } = response.data.data;

    if (!access_token) {
      errorMessage.value = "Gagal login. Silakan periksa kembali.";
      return;
    }

    Cookie.set("auth.token", access_token, {
      expires: 1,
      secure: true,
      sameSite: "Lax",
    });

    localStorage.setItem("user", JSON.stringify(user));

    setUserType("tabs");
    router.push("/tabs/check-in");
  } catch (error: any) {
    errorMessage.value = error?.response?.data?.message || "Login gagal.";
  } finally {
    isSubmitting.value = false;
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

/* Animasi muncul */
.fade-slide-enter-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-slide-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.error-text {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 12px;
  color: var(--ion-color-danger);
}

ion-input.invalid {
  --border-color: var(--ion-color-danger);
  --highlight-color-focused: var(--ion-color-danger);
  --highlight-color: var(--ion-color-danger);
  transition: border-color 0.2s ease;
}
</style>
