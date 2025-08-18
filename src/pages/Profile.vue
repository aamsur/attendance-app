<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>My Profile</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="profile-container">
        <img
          src="https://i.pravatar.cc/150?img=3"
          alt="Avatar"
          class="avatar"
        />
        <h1>James Chen</h1>
        <p>
          I build software and scale product-driven organizations through
          technology and leadership.
        </p>
      </div>

      <ion-card>
        <ion-card-header>
          <ion-card-title>Employee Information</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-list>
            <ion-item>
              <ion-label>ID</ion-label>
              <ion-note slot="end">EMP-2025-001</ion-note>
            </ion-item>
            <ion-item>
              <ion-label>Department</ion-label>
              <ion-note slot="end">Sales and Marketing</ion-note>
            </ion-item>
            <ion-item>
              <ion-label>Position</ion-label>
              <ion-note slot="end">Head of Sales and Marketing</ion-note>
            </ion-item>
            <ion-item>
              <ion-label>Location</ion-label>
              <ion-note slot="end">Puri Kembangan, Indonesia</ion-note>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-title>Personal Information</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-list>
            <ion-item>
              <ion-label>Email</ion-label>
              <ion-note slot="end">james@ai.com</ion-note>
            </ion-item>
            <ion-item>
              <ion-label>Phone</ion-label>
              <ion-note slot="end">+62 812 3456 7890</ion-note>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>

      <p
        style="text-align: center; font-weight: 500; margin-bottom: 12px"
        class="signout-button"
      >
        Logged in as <strong>James Chen</strong>

        <!-- 🚪 Sign Out Button -->
        <ion-button expand="block" color="danger" @click="handleSignOut">
          Sign Out
        </ion-button>
      </p>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonNote,
  IonList,
  IonButton,
  useIonRouter,
} from "@ionic/vue";

import { useAuth } from "@/composables/useAuth";
import { useHttp } from "@/composables/useHttp";
import { onMounted, ref } from "vue";

const router = useIonRouter();
const { logout } = useAuth();
const { $http_get } = useHttp();

const profile = ref(null);

onMounted(async () => {
  try {
    const response = await $http_get("/auth/me");
    profile.value = response.data;
    console.log("Profile loaded", profile.value);
  } catch (err) {
    console.error("Failed to fetch profile:", err);
  }
});

const handleSignOut = () => {
  logout(); // ✅ updates layout and session
};

</script>

<style scoped>
ion-content {
  --background: var(--dashboard-bg);
}

.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: 24px;
  margin-bottom: 24px;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

ion-card {
  border-radius: 12px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06);
  margin-bottom: 20px;
}

ion-item {
  --background: transparent;
  --padding-start: 0;
  font-size: 15px;
}

.signout-button {
  margin: 28px auto 32px;
  max-width: 300px;
  display: block;
}
</style>
