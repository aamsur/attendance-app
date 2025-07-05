<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Employee Dashboard</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="dashboard-container">
        <div class="greeting-section">
          <h2>Hello, {{ employeeName }} 👋</h2>
          <p>Welcome back! Here's your attendance overview.</p>
        </div>

        <ion-card class="attendance-summary">
          <ion-card-header>
            <ion-card-title>Today's Status</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <div class="summary-row">
              <p>Status:</p>
              <strong :class="statusColorClass">{{ attendanceStatus }}</strong>
            </div>
            <div class="summary-row">
              <p>Check-In:</p>
              <span>{{ checkInTime || "-" }}</span>
            </div>
            <div class="summary-row">
              <p>Check-Out:</p>
              <span>{{ checkOutTime || "-" }}</span>
            </div>
          </ion-card-content>
        </ion-card>

        <ion-grid class="quick-actions">
          <ion-row>
            <ion-col size="6">
              <ion-button
                expand="block"
                color="success"
                router-link="/tabs/check-in"
                >Check-In</ion-button
              >
            </ion-col>
            <ion-col size="6">
              <ion-button
                expand="block"
                color="tertiary"
                router-link="/tabs/records"
                >My Records</ion-button
              >
            </ion-col>
          </ion-row>
          <ion-row class="ion-margin-top">
            <ion-col size="12">
              <ion-button expand="block" fill="outline" router-link="/tabs/team"
                >Team Overview</ion-button
              >
            </ion-col>
          </ion-row>
        </ion-grid>

        <ion-card class="reminder-card">
          <ion-card-header>
            <ion-card-title>📢 Reminder</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ul>
              <li>Be sure to Tap In before 08:00 AM.</li>
              <li>Late check-ins after 08:15 will be flagged.</li>
              <li>Tap Out before leaving the office.</li>
            </ul>
          </ion-card-content>
        </ion-card>
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
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
} from "@ionic/vue";

const employeeName = sessionStorage.getItem("employeeName") || "James Chen";

// Dummy data for check-in/out
const checkInTime = "08:12";
const checkOutTime = "";
const attendanceStatus = checkInTime
  ? parseInt(checkInTime.split(":")[0]) > 8
    ? "Late"
    : "Present"
  : "Absent";

const statusColorClass =
  attendanceStatus === "Present"
    ? "status-green"
    : attendanceStatus === "Late"
    ? "status-yellow"
    : "status-red";
</script>

<style scoped>
ion-content {
  --background: var(--dashboard-bg);
}

.dashboard-container {
  max-width: 600px;
  margin: 0 auto;
  padding-bottom: 24px;
}

.greeting-section {
  text-align: center;
  margin-bottom: 20px;
  background: var(--dashboard-accent);
  padding: 16px;
  border-radius: 12px;
}

.attendance-summary,
.reminder-card {
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  font-size: 15px;
}

.status-green {
  color: var(--ion-color-success);
  transition: color 0.3s ease;
}

.status-yellow {
  color: var(--ion-color-warning);
  transition: color 0.3s ease;
}

.status-red {
  color: var(--ion-color-danger);
  transition: color 0.3s ease;
}

.quick-actions ion-button {
  font-size: 14px;
  height: 45px;
}
</style>
