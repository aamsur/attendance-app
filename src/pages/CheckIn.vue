<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Check-In</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div id="map" class="map"></div>
      <ion-fab vertical="top" horizontal="end" class="refresh-fab">
        <ion-fab-button color="light" @click="getCurrentLocation">
          <ion-icon :icon="refreshOutline" />
        </ion-fab-button>
      </ion-fab>

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
          class="ion-margin-top"
          :disabled="isSubmitting || tapInTime !== '' || tapOutTime !== ''"
          @click="onTapIn"
        >
          {{
            isSubmitting && pendingAction === "in" ? "Processing…" : "Tap In"
          }}
        </ion-button>

        <ion-button
          expand="block"
          color="warning"
          class="ion-margin-top"
          :disabled="isSubmitting || tapOutTime !== ''"
          @click="onTapOut"
        >
          {{
            isSubmitting && pendingAction === "out" ? "Processing…" : "Tap Out"
          }}
        </ion-button>

        <div class="timestamps" v-if="tapInTime || tapOutTime">
          <p v-if="tapInTime">
            🕒 Tap In at: <strong>{{ tapInTime }}</strong>
          </p>
          <p v-if="tapOutTime">
            🕒 Tap Out at: <strong>{{ tapOutTime }}</strong>
          </p>
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
  IonFab,
  IonFabButton,
  IonIcon,
} from "@ionic/vue";
import { ref } from "vue";
import L from "leaflet";
import { useHttp } from "@/composables/useHttp";
import { refreshOutline } from "ionicons/icons";

// 📍 Fix Leaflet marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL(
    "leaflet/dist/images/marker-icon-2x.png",
    import.meta.url
  ).href,
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href,
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url)
    .href,
});

// === Konstanta Lokasi Kantor ===
const officeLat = -6.287754;
const officeLng = 106.615757;
const allowedRadius = 100; // meters

// === State ===
const tapInTime = ref("");
const tapOutTime = ref("");
const locationMessage = ref("Checking your location...");
const isWithinArea = ref(false);
const isOutsideArea = ref(true);
const isSubmitting = ref(false);
const pendingAction = ref<"in" | "out" | "">("");
const currentLat = ref<number | null>(null);
const currentLng = ref<number | null>(null);

const { $http_post } = useHttp();

const getEmployeeId = (): string => {
  return "d290f1ee-6c54-4b01-90e6-d701748f0851"; // Ganti dari auth/session
};

const formatTime = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const formatTimestamp = (d: Date) => {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

const getDistanceFromLatLonInMeters = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const R = 6371e3;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const presentLocationAlert = async () => {
  const alert = await alertController.create({
    header: "Location Access Denied",
    message: "Please enable location permission in your browser/app.",
    buttons: ["OK"],
  });
  await alert.present();
};

const performCheck = async (type: "in" | "out") => {
  if (currentLat.value === null || currentLng.value === null) {
    const alert = await alertController.create({
      header: "Location Not Ready",
      message: "Location belum tersedia.",
      buttons: ["OK"],
    });
    await alert.present();
    return;
  }

  isSubmitting.value = true;
  pendingAction.value = type;

  const now = new Date();
  const payload = {
    lat: String(currentLat.value),
    long: String(currentLng.value),
    employee_id: getEmployeeId(),
    timestamp: formatTimestamp(now),
    check_in_type: type,
  };

  try {
    await $http_post("attendance/check-in", payload);
    if (type === "in") tapInTime.value = formatTime();
    if (type === "out") tapOutTime.value = formatTime();
  } catch (err: any) {
    const msg =
      err?.response?.data?.message || err.message || "Failed to submit.";
    const alert = await alertController.create({
      header: "Check-In Failed",
      message: msg,
      buttons: ["OK"],
    });
    await alert.present();
  } finally {
    isSubmitting.value = false;
    pendingAction.value = "";
  }
};

const showWarningConfirm = async (type: "in" | "out") => {
  const alert = await alertController.create({
    header: "Outside Allowed Area",
    message: `You are outside the allowed area. Continue to ${
      type === "in" ? "Tap In" : "Tap Out"
    }?`,
    buttons: [
      { text: "Cancel", role: "cancel" },
      { text: "Proceed", handler: () => performCheck(type) },
    ],
  });
  await alert.present();
};

const onTapIn = () =>
  isOutsideArea.value ? showWarningConfirm("in") : performCheck("in");
const onTapOut = () =>
  isOutsideArea.value ? showWarningConfirm("out") : performCheck("out");

// === Map & Location ===
let mapInstance: L.Map | null = null;
let currentMarker: L.Marker | null = null;

const getCurrentLocation = () => {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      currentLat.value = lat;
      currentLng.value = lng;

      const dist = getDistanceFromLatLonInMeters(
        lat,
        lng,
        officeLat,
        officeLng
      );
      isWithinArea.value = dist <= allowedRadius;
      isOutsideArea.value = !isWithinArea.value;
      locationMessage.value = isWithinArea.value
        ? "✅ You are within the allowed area."
        : "⚠️ You are outside the allowed check-in zone.";

      if (mapInstance) {
        mapInstance.setView([lat, lng], 17);
        mapInstance.invalidateSize();
        if (currentMarker) {
          currentMarker.setLatLng([lat, lng]);
        } else {
          currentMarker = L.marker([lat, lng])
            .addTo(mapInstance)
            .bindPopup("You are here")
            .openPopup();
        }
      }
    },
    (err) => {
      if (err.code === 1) presentLocationAlert();
      else {
        isOutsideArea.value = true;
        locationMessage.value = `❌ Location error: ${err.message}`;
      }
    },
    { enableHighAccuracy: true, timeout: 5000 }
  );
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
    tap: false,
  }).setView([0, 0], 15);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(mapInstance);

  getCurrentLocation();
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
