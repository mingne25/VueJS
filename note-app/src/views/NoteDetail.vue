<template>
  <v-container class="pa-4">
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card v-if="note" class="note-detail-card" elevation="10" role="article">
          <v-card-title class="text-h5 font-weight-bold pb-1">
            <v-icon color="primary" size="24" class="mr-2">mdi-note-text</v-icon>
            {{ note.title }}
          </v-card-title>
          <v-card-subtitle class="text-grey-darken-1 pb-2">
            <v-icon size="18" class="mr-1" color="grey">mdi-calendar</v-icon>
            {{ note.createdAt ? new Date(note.createdAt).toLocaleString() : 'No date' }}
          </v-card-subtitle>
          <v-divider class="mb-2" />
          <v-card-text class="note-detail-content">
            {{ note.content }}
          </v-card-text>
          <v-divider class="my-2" />
          <v-card-actions class="justify-end">
            <v-btn :to="{ path: '/notes' }" color="primary" variant="tonal">
              <v-icon start size="18">mdi-arrow-left</v-icon>
              Back to Notes
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-alert v-else type="error" class="mt-8" border="start" color="error" variant="tonal">
          <v-icon start class="mr-2">mdi-alert-circle</v-icon>
          Note not found.
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useNotes } from '../composables/useNotes';
import { useRoute } from 'vue-router';

export default {
  name: 'NoteDetailView',
  setup() {
    const route = useRoute();
    const { getNoteById } = useNotes();
    const note = getNoteById(parseInt(route.params.id));
    return { note };
  },
};
</script>

<style scoped>
.note-detail-card {
  border-radius: 18px;
  box-shadow: 0 6px 24px 0 #00000018;
  background: #fff;
  margin-top: 32px;
}
.note-detail-content {
  font-size: 1.13rem;
  color: #444;
  min-height: 80px;
  word-break: break-word;
  padding-bottom: 0.5rem;
}
</style>