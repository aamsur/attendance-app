<template>
  <ion-app>
    <component :is="layoutComponent" />
  </ion-app>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { IonApp } from '@ionic/vue'
import TabsLayout from './layouts/TabsLayout.vue'
import MenuLayout from './layouts/MenuLayout.vue'
import { provideAuth } from '@/composables/useAuth'

// ✅ Provide and access userType directly
const { userType } = provideAuth()

// ✅ Use local reactive userType for layout switching
const layoutComponent = computed(() =>
  userType.value === 'menu' ? MenuLayout : TabsLayout
)
</script>
