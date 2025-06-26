<template>
  <v-container>
    <NoteFormComponent @save="resetForm" :note="editingNote" />
    <NoteListComponent :notes="notes" @edit="editNote" @delete="deleteNote" />
  </v-container>
</template>

<script>
import NoteFormComponent from '../components/NoteForm.vue';
import NoteListComponent from '../components/NoteList.vue';
import { useNotes } from '../composables/useNotes';
import { ref } from 'vue';

export default {
  name: 'NotesView',
  components: { NoteFormComponent, NoteListComponent },
  setup() {
    const { notes, addNote, updateNote, deleteNote } = useNotes();
    const editingNote = ref(null);

    const handleSave = (note) => {
      if (note.id) {
        updateNote(note.id, note);
      } else {
        addNote({ ...note, id: Date.now() });
      }
      editingNote.value = null;
    };

    const editNote = (note) => {
      editingNote.value = { ...note };
    };

    const resetForm = () => {
      editingNote.value = null;
    };

    return { notes, handleSave, deleteNote, editNote, editingNote, resetForm };
  },
};
</script>