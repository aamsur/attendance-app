<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Check-In</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div id="map" class="map"></div>

      <div class="checkin-container">
        <p
          class="location-msg"
          :class="{ success: isWithinArea, error: isOutsideArea }"
        >
          {{ locationMessage }}
        </p>

        <ion-button
          expand="block"
          color="success"
          :disabled="tapInTime !== '' || tapOutTime !== ''"
          @click="handleTapIn"
        >
          Tap In
        </ion-button>

        <ion-button
          expand="block"
          color="warning"
          class="ion-margin-top"
          :disabled="tapOutTime !== ''"
          @click="handleTapOut"
        >
          Tap Out
        </ion-button>

        <div class="timestamps" v-if="tapInTime || tapOutTime">
          <p v-if="tapInTime">🕒 Tap In at: <strong>{{ tapInTime }}</strong></p>
          <p v-if="tapOutTime">🕒 Tap Out at: <strong>{{ tapOutTime }}</strong></p>
        </div>
      </div>
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
  IonButton,
  onIonViewDidEnter,
  onIonViewWillLeave,
  alertController,
} from "@ionic/vue";
import { ref } from "vue";
import L from "leaflet";

// 📍 Fix Leaflet marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url).href,
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href,
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).href,
});

// const officeLat = -6.187717333029827;
// const officeLng = 106.68965962663124;
const officeLat = -6.287754;
const officeLng = 106.615757;
const allowedRadius = 100; // meters

const tapInTime = ref("");
const tapOutTime = ref("");
const locationMessage = ref("Checking your location...");
const isWithinArea = ref(false);
const isOutsideArea = ref(true);

let mapInstance: L.Map | null = null;

const formatTime = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const showWarningConfirm = async (action: 'tap-in' | 'tap-out') => {
  const alert = await alertController.create({
    header: "Outside Allowed Area",
    message: `You are outside the allowed location. Are you sure you want to ${action === 'tap-in' ? 'Tap In' : 'Tap Out'}?`,
    buttons: [
      {
        text: "Cancel",
        role: "cancel",
      },
      {
        text: "Proceed",
        handler: () => {
          if (action === 'tap-in') {
            tapInTime.value = formatTime();
          } else {
            tapOutTime.value = formatTime();
          }
        },
      },
    ],
  });
  await alert.present();
};

const handleTapIn = () => {
  if (isOutsideArea.value) {
    showWarningConfirm("tap-in");
  } else {
    tapInTime.value = formatTime();
  }
};

const handleTapOut = () => {
  if (isOutsideArea.value) {
    showWarningConfirm("tap-out");
  } else {
    tapOutTime.value = formatTime();
  }
};

function getDistanceFromLatLonInMeters(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371e3;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const presentLocationAlert = async () => {
  const alert = await alertController.create({
    header: "Location Access Denied",
    message: "Location permission is required to check in. Please enable it in your browser settings.",
    buttons: [
      { text: "Cancel", role: "cancel" },
      {
        text: "Go to Settings",
        handler: () => {
          window.open("https://support.google.com/chrome/answer/142065", "_blank");
        },
      },
    ],
  });
  await alert.present();
};

onIonViewDidEnter(() => {
  if (mapInstance) {
    mapInstance.remove();
    mapInstance = null;
  }

  mapInstance = L.map("map", {
  zoomControl: false,
  scrollWheelZoom: false,
  doubleClickZoom: false,
  dragging: false,
  touchZoom: false,
  boxZoom: false,
  keyboard: false,
  tap: false
}).setView([0, 0], 15);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(mapInstance);

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      mapInstance!.setView([lat, lng], 17);
      mapInstance!.invalidateSize();

      L.marker([lat, lng])
        .addTo(mapInstance!)
        .bindPopup("You are here!")
        .openPopup();

      const distance = getDistanceFromLatLonInMeters(lat, lng, officeLat, officeLng);
      isWithinArea.value = distance <= allowedRadius;
      isOutsideArea.value = !isWithinArea.value;
      locationMessage.value = isWithinArea.value
        ? "✅ You are within the allowed area."
        : "⚠️ You are outside the allowed check-in zone.";
    },
    (error) => {
      if (error.code === 1) {
        presentLocationAlert();
      } else {
        isOutsideArea.value = true;
        locationMessage.value = `❌ Location error: ${error.message}`;
      }
    },
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }
  );
});

onIonViewWillLeave(() => {
  if (mapInstance) {
    mapInstance.remove();
    mapInstance = null;
  }
});
</script>

<style scoped>
ion-content {
  --background: var(--dashboard-bg);
}

.map {
  height: 300px;
  width: 100%;
  margin: 24px 0;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.checkin-container {
  text-align: center;
  max-width: 400px;
  margin: 32px auto 0;
  padding: 0 16px;
}

ion-button {
  width: 100%;
  max-width: 300px;
  margin: 12px auto;
}

.timestamps {
  margin-top: 24px;
  text-align: left;
  padding: 12px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

.location-msg {
  margin-bottom: 20px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  gap: 8px;
  align-items: center;
}

.success {
  color: var(--ion-color-success);
}

.error {
  color: var(--ion-color-danger);
}
</style>
