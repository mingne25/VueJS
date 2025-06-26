<script setup>
import { ref } from 'vue'
import NavDrawerComponent from './components/NavDrawer.vue'
import { useDisplay } from 'vuetify'

const drawer = ref(true)
const { smAndDown } = useDisplay()
const toggleDrawer = () => {
  drawer.value = !drawer.value
}
</script>

<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar
      app
      color="primary"
      elevate-on-scroll
      flat
      class="text-white"
    >
      <v-btn
        icon
        @click="toggleDrawer"
        class="mr-2"
        v-if="smAndDown"
        aria-label="Toggle navigation menu"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-toolbar-title class="font-weight-bold">Note Manager</v-toolbar-title>
      <v-spacer />
      <v-btn icon href="https://github.com/" target="_blank" aria-label="GitHub">
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Navigation Drawer -->
    <NavDrawerComponent v-model="drawer" :permanent="!smAndDown" />

    <!-- Main Content -->
    <v-main class="main-content">
      <v-container fluid class="pa-4">
        <router-view />
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer app color="grey-lighten-4" class="text-center">
      <v-col>
        <span class="grey--text text--darken-1">© {{ new Date().getFullYear() }} Note Manager</span>
      </v-col>
    </v-footer>
  </v-app>
</template>

<style scoped>
.main-content {
  min-height: 80vh;
  background: #f9f9fb;
  border-radius: 12px;
  box-shadow: 0 2px 8px 0 #0000000a;
}
.v-footer {
  font-size: 0.95rem;
  letter-spacing: 0.5px;
}
</style>