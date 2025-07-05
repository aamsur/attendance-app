<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Team Attendance</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding team-background">
      <div class="team-wrapper">
        <ion-card v-for="member in team" :key="member.id" class="team-card">
          <ion-item lines="none">
            <ion-avatar slot="start" class="avatar">
              <img :src="member.avatar" :alt="member.name" />
            </ion-avatar>

            <ion-label>
              <div class="name">{{ member.name }}</div>
              <p class="role">{{ member.role }}</p>
            </ion-label>

            <ion-badge :color="getStatusColor(member.status)">
              {{ member.status }}
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
  IonAvatar,
  IonBadge
} from '@ionic/vue'

import { ref } from 'vue'

interface TeamMember {
  id: number
  name: string
  role: string
  status: 'Present' | 'Absent' | 'Late'
  avatar: string
}

const team = ref<TeamMember[]>([
  {
    id: 1,
    name: 'John Doe',
    role: 'Frontend Developer',
    status: 'Present',
    avatar: 'https://i.pravatar.cc/100?img=1'
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'Backend Developer',
    status: 'Late',
    avatar: 'https://i.pravatar.cc/100?img=2'
  },
  {
    id: 3,
    name: 'Alex Lee',
    role: 'QA Engineer',
    status: 'Absent',
    avatar: 'https://i.pravatar.cc/100?img=3'
  },
  {
    id: 4,
    name: 'Lina Kusuma',
    role: 'UI/UX Designer',
    status: 'Present',
    avatar: 'https://i.pravatar.cc/100?img=4'
  },
  {
    id: 5,
    name: 'Brian Sanjaya',
    role: 'DevOps Engineer',
    status: 'Late',
    avatar: 'https://i.pravatar.cc/100?img=5'
  }
])

const getStatusColor = (status: TeamMember['status']) => {
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
.team-background {
  --background: #f6f7fb;
}

.team-wrapper {
  max-width: 600px;
  margin: 0 auto;
}

.team-card {
  margin-bottom: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  overflow: hidden;
}

.name {
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 2px;
}

.role {
  color: var(--ion-color-medium);
  font-size: 14px;
  margin: 0;
}

ion-badge {
  text-transform: capitalize;
  font-size: 0.75rem;
  height: 20px;
  align-self: center;
}
</style>
