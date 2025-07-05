<template>
  <ion-page>
    <ion-header class="header-noshadow">
      <ion-toolbar class="toolbar-border">
        <ion-title>Attendance Dashboard</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="dashboard-wrapper">
        <div class="greeting-section">
          <h2>Hello, Admin 👋</h2>
          <p>Here's a quick overview of today's attendance activity.</p>
        </div>

        <div class="stats-grid">
          <ion-card class="stat-card present">
            <ion-card-header>
              <ion-card-title>Employees Present</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <h1>78</h1>
            </ion-card-content>
          </ion-card>

          <ion-card class="stat-card absent">
            <ion-card-header>
              <ion-card-title>Absent Today</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <h1>12</h1>
            </ion-card-content>
          </ion-card>

          <ion-card class="stat-card late">
            <ion-card-header>
              <ion-card-title>Late Check-ins</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <h1>5</h1>
            </ion-card-content>
          </ion-card>
        </div>

        <ion-card class="recent-card">
          <ion-card-header>
            <ion-card-title>📌 Recent Activity</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-list lines="none">
              <ion-item>
                <ion-label>👤 John Doe checked in at 08:03</ion-label>
              </ion-item>
              <ion-item>
                <ion-label>👤 Jane Smith checked in at 08:10</ion-label>
              </ion-item>
              <ion-item>
                <ion-label>👤 Alice Tan checked out at 17:01</ion-label>
              </ion-item>
            </ion-list>
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
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/vue";
</script>

<style scoped>
ion-content {
  --background: var(--dashboard-bg, #f9fafa);
}

.dashboard-wrapper {
  max-width: 1000px;
  margin: 0 auto;
  padding-top: 24px;
  padding-left: 24px;
  padding-right: 24px;
  box-sizing: border-box;
}

.greeting-section {
  text-align: center;
  margin-bottom: 24px;
}

.greeting-section h2 {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 6px;
}

.greeting-section p {
  font-size: 15px;
  color: var(--ion-color-medium);
}

.stats-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  flex: 1 1 30%;
  min-width: 220px;
  border-radius: 8px;
}

.stat-card h1 {
  font-size: 32px;
  font-weight: bold;
  margin: 0;
}

.stat-card.present h1 {
  color: var(--ion-color-success);
}

.stat-card.absent h1 {
  color: var(--ion-color-danger);
}

.stat-card.late h1 {
  color: var(--ion-color-warning);
}

.recent-card {
  margin-top: 12px;
}

ion-item {
  --background: transparent;
  padding-left: 0;
}

ion-card-title {
  font-size: 16px;
  font-weight: 600;
}
</style>
