<template>
  <ion-split-pane content-id="main-content" when="xs">
    <!-- Sidebar -->
    <ion-menu
      content-id="main-content"
      class="chatgpt-sidebar"
      :swipeGesture="false"
    >
      <ion-header class="sidebar-header">
        <ion-toolbar color="primary">
          <ion-title class="sidebar-title">Presensia</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content class="sidebar-content">
        <ion-list class="sidebar-list">
          <ion-item
            router-link="/landing"
            router-direction="root"
            class="sidebar-item"
            lines="none"
          >
            Home
          </ion-item>
          <ion-item
            router-link="/reports"
            router-direction="root"
            class="sidebar-item"
            lines="none"
          >
            Reports
          </ion-item>
          <ion-item
            router-link="/profile"
            router-direction="root"
            class="sidebar-item"
            lines="none"
          >
            Profile
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>

    <!-- Main Content -->
    <ion-router-outlet id="main-content" />
  </ion-split-pane>
</template>

<script setup lang="ts">
import {
  IonSplitPane,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonRouterOutlet,
} from "@ionic/vue";
</script>

<style scoped>
/* Sidebar item base style */
.sidebar-item::part(native) {
  font-size: 13.5px;
  font-weight: 500;
  border-radius: 4px;
  background: transparent;
  transition: background 0.2s ease;
  line-height: 1.3;
  min-height: unset;
  cursor: pointer;
  padding: 8px 12px;
}

/* Hover effect */
.sidebar-item:hover::part(native) {
  background: #40414f;
  color: #ececf1;
}

/* Activated route styling */
.sidebar-item.ion-activated::part(native) {
  background: #202123;
  font-weight: 600;
  border-left: 3px solid #10a37f;
}
</style>
