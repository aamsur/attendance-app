<template>
  <ion-page>
    <div ref="gestureArea" class="gesture-area">
      <ion-tabs>
        <ion-router-outlet />

        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="home" href="/tabs/home">
            <ion-icon :icon="homeOutline" />
            <ion-label>Home</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="records" href="/tabs/records">
            <ion-icon :icon="calendarOutline" />
            <ion-label>Records</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="check-in" href="/tabs/check-in">
            <ion-icon :icon="logInOutline" />
            <ion-label>Check-In</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="team" href="/tabs/team">
            <ion-icon :icon="peopleOutline" />
            <ion-label>Team</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="profile" href="/tabs/profile">
            <ion-icon :icon="personCircleOutline" />
            <ion-label>Profile</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>
    </div>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
} from "@ionic/vue";

import {
  homeOutline,
  calendarOutline,
  logInOutline,
  peopleOutline,
  personCircleOutline,
} from "ionicons/icons";

import { ref, onMounted } from "vue";
import { useIonRouter } from "@ionic/vue";
import { useRoute } from "vue-router";
import { createGesture } from "@ionic/core";

// Ordered tab routes
const tabRoutes = [
  "/tabs/home",
  "/tabs/records",
  "/tabs/check-in",
  "/tabs/team",
  "/tabs/profile",
];

const gestureArea = ref<HTMLElement | null>(null);
const router = useIonRouter();
const route = useRoute();

onMounted(() => {
  const gesture = createGesture({
    el: gestureArea.value!,
    gestureName: "swipe-tabs",
    threshold: 15,
    onEnd: (ev) => {
      const currentPath = route.path;
      const currentIndex = tabRoutes.indexOf(currentPath);

      if (ev.deltaX < -50 && currentIndex < tabRoutes.length - 1) {
        router.push(tabRoutes[currentIndex + 1]);
      } else if (ev.deltaX > 50 && currentIndex > 0) {
        router.back(); // go back if route is in history
      }
    },
  });

  gesture.enable(true);
});
</script>

<style scoped>
.gesture-area {
  height: 100%;
  width: 100%;
}
</style>
