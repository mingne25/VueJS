<template>
  <v-row>
    <v-col
      v-for="note in notes"
      :key="note.id"
      cols="12"
      sm="6"
      md="4"
      lg="3"
    >
      <NoteItem
        :note="note"
        @edit="$emit('edit', note)"
        @delete="$emit('delete', note.id)"
      />
    </v-col>
  </v-row>
</template>

<script setup>
import NoteItem from './NoteItem.vue'
// eslint-disable-next-line no-undef
defineProps(['notes'])
// eslint-disable-next-line no-undef
defineEmits(['edit', 'delete'])
</script>