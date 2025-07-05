<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Attendance Records</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding records-background">
      <div class="records-wrapper">
        <ion-card
          v-for="record in attendanceRecords"
          :key="record.date"
          class="record-card"
        >
          <ion-item lines="none">
            <ion-label>
              <div class="record-date">{{ record.date }}</div>
              <div class="check-info">
                Tap In: <strong>{{ record.checkIn }}</strong>
              </div><div class="check-info">
                Tap Out: <strong>{{ record.checkOut }}</strong>
              </div>
            </ion-label>
            <ion-badge :color="getStatusColor(record.status)">
              {{ record.status }}
            </ion-badge>
          </ion-item>
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
  IonItem,
  IonLabel,
  IonBadge
} from '@ionic/vue'
import { ref } from 'vue'

interface RecordEntry {
  date: string
  status: 'Present' | 'Late' | 'Absent'
  checkIn: string
  checkOut: string
}

const attendanceRecords = ref<RecordEntry[]>([
  { date: '2025-07-01', status: 'Present', checkIn: '08:01', checkOut: '17:03' },
  { date: '2025-06-30', status: 'Late', checkIn: '08:20', checkOut: '17:05' },
  { date: '2025-06-29', status: 'Absent', checkIn: '-', checkOut: '-' },
  { date: '2025-06-28', status: 'Present', checkIn: '08:03', checkOut: '17:01' },
  { date: '2025-06-27', status: 'Late', checkIn: '08:25', checkOut: '17:10' },
  { date: '2025-06-26', status: 'Present', checkIn: '08:00', checkOut: '17:00' },
  { date: '2025-06-25', status: 'Absent', checkIn: '-', checkOut: '-' }
])

const getStatusColor = (status: RecordEntry['status']) => {
  switch (status) {
    case 'Present':
      return 'success'
    case 'Late':
      return 'warning'
    case 'Absent':
      return 'danger'
    default:
      return 'medium'
  }
}
</script>

<style scoped>
.records-background {
  --background: #f6f7fb;
}

.records-wrapper {
  max-width: 600px;
  margin: 0 auto;
}

.record-card {
  margin-bottom: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

ion-item {
  --inner-padding-start: 16px;
  --inner-padding-end: 16px;
  --padding-top: 14px;
  --padding-bottom: 14px;
}

.record-date {
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 6px;
}

.record-status {
  font-size: 14px;
  margin-bottom: 4px;
}

.check-info {
  font-size: 13px;
  color: var(--ion-color-medium);
}

.status-label {
  text-transform: capitalize;
}

.status-label.present {
  color: var(--ion-color-success);
}

.status-label.late {
  color: var(--ion-color-warning);
}

.status-label.absent {
  color: var(--ion-color-danger);
}

ion-badge {
  text-transform: capitalize;
  font-size: 0.75rem;
  height: 20px;
  align-self: center;
}
</style>
