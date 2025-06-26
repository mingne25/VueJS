<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" md="8" class="text-center">
        <h1 class="display-2 font-weight-bold mb-6">Welcome to the Note App</h1>
        <v-btn color="primary" :to="{ path: '/notes' }" large class="mt-4" elevation="2">
          <v-icon left>mdi-note-multiple</v-icon>
          View Notes
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'HomeView',
};
</script>