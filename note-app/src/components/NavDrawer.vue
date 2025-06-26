<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    aria-label="Navigation menu"
    width="240"
    color="grey-lighten-4"
    class="elevation-2"
  >
    <v-list nav dense>
      <v-list-item
        to="/"
        :active="route.path === '/'"
        color="primary"
        rounded
        link
        class="nav-item"
      >
        <v-icon color="primary" class="mr-2">mdi-home</v-icon>
        <v-list-item-title class="font-weight-medium">Home</v-list-item-title>
      </v-list-item>
      <v-list-item
        to="/notes"
        :active="route.path.startsWith('/notes')"
        color="primary"
        rounded
        link
        class="nav-item"
      >
        <v-icon color="primary" class="mr-2">mdi-note</v-icon>
        <v-list-item-title class="font-weight-medium">Notes</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const drawer = ref(true)
const route = useRoute()
</script>

<style scoped>
.nav-item {
  margin-bottom: 8px;
  transition: background 0.2s;
}
.nav-item.v-list-item--active {
  background: #e3f2fd !important;
  color: #1976d2 !important;
  border-radius: 8px;
}
.v-list-item-title {
  font-size: 1.08rem;
  margin-left: 4px;
}
</style>