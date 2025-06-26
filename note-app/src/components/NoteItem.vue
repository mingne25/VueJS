<template>
  <v-card
    class="ma-4 note-card"
    elevation="6"
    max-width="420"
    min-width="280"
    role="article"
  >
    <v-card-title class="text-h6 font-weight-bold pb-1">
      <v-icon color="primary" size="20" class="mr-2">mdi-note-text</v-icon>
      {{ note.title }}
    </v-card-title>
    <v-card-text class="note-content">
      {{ note.content.length > 120 ? note.content.slice(0, 120) + '...' : note.content }}
    </v-card-text>
    <v-divider class="my-2" />
    <v-card-actions class="justify-end">
      <v-btn :to="'/note/' + note.id" color="primary" variant="tonal" size="small">
        <v-icon start size="18">mdi-eye</v-icon> View
      </v-btn>
      <v-btn @click="$emit('edit', note)" color="secondary" variant="tonal" size="small">
        <v-icon start size="18">mdi-pencil</v-icon> Edit
      </v-btn>
      <v-btn @click="$emit('delete', note.id)" color="error" variant="tonal" size="small" aria-label="Delete note">
        <v-icon start size="18">mdi-delete</v-icon> Delete
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
// eslint-disable-next-line no-undef
defineProps(['note'])
// eslint-disable-next-line no-undef
defineEmits(['edit', 'delete'])
</script>

<style scoped>
.note-card {
  border-radius: 18px;
  box-shadow: 0 4px 18px 0 #00000014;
  background: #f9fafb;
  transition: box-shadow 0.2s;
}
.note-card:hover {
  box-shadow: 0 8px 32px 0 #00000022;
}
.note-content {
  font-size: 1.08rem;
  color: #444;
  min-height: 60px;
  padding-bottom: 0.5rem;
  word-break: break-word;
}
.v-card-actions {
  gap: 0.5rem;
}
</style>