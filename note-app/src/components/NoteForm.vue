<template>
  <v-row justify="center" align="center" class="form-row">
    <v-col cols="12" md="10" lg="8" xl="6">
      <v-card class="pa-8 form-card" elevation="8">
        <v-card-title class="text-h5 font-weight-bold mb-6 text-center">
          <v-icon color="primary" size="32" class="mr-2">mdi-note-edit-outline</v-icon>
          {{ form.id ? 'Edit Note' : 'Add Note' }}
        </v-card-title>
        <v-form @submit.prevent="handleSubmit">
          <v-text-field
            v-model="form.title"
            label="Title"
            required
            :error-messages="errors.title"
            aria-label="Note title"
            class="mb-5"
            density="comfortable"
            variant="outlined"
            color="primary"
            prepend-inner-icon="mdi-format-title"
            style="font-size: 1.15rem;"
          />
          <v-textarea
            v-model="form.content"
            label="Content"
            required
            :error-messages="errors.content"
            aria-label="Note content"
            class="mb-5"
            rows="6"
            auto-grow
            variant="outlined"
            color="primary"
            prepend-inner-icon="mdi-text"
            style="font-size: 1.12rem;"
          />
          <v-row class="mt-2" align="center" justify="center">
            <v-col cols="12" md="6">
              <v-btn
                type="submit"
                color="primary"
                block
                size="large"
                class="font-weight-bold"
                style="font-size: 1.1rem; letter-spacing: 1px;"
              >
                <v-icon start>mdi-content-save</v-icon>
                {{ form.id ? 'Update Note' : 'Save Note' }}
              </v-btn>
            </v-col>
            <v-col cols="12" md="6">
              <v-btn
                type="button"
                color="grey-lighten-1"
                block
                size="large"
                variant="outlined"
                class="font-weight-bold"
                style="font-size: 1.1rem; letter-spacing: 1px;"
                @click="resetForm"
              >
                <v-icon start>mdi-refresh</v-icon>
                Reset
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { ref, watch } from 'vue';
import { useNotes } from '../composables/useNotes';

export default {
  name: 'NoteFormComponent',
  props: {
    note: { type: Object, default: null },
  },
  emits: ['save'],
  setup(props, { emit }) {
    const { addNote, updateNote } = useNotes();
    const form = ref({ title: '', content: '', id: null });
    const errors = ref({ title: '', content: '' });

    watch(() => props.note, (newNote) => {
      if (newNote) Object.assign(form.value, newNote);
      else Object.assign(form.value, { title: '', content: '', id: null });
    }, { immediate: true });

    const handleSubmit = () => {
      errors.value = { title: '', content: '' };
      if (!form.value.title) errors.value.title = 'Title is required';
      if (!form.value.content) errors.value.content = 'Content is required';
      if (errors.value.title || errors.value.content) return;

      if (form.value.id) updateNote(form.value.id, { title: form.value.title, content: form.value.content });
      else addNote({ title: form.value.title, content: form.value.content });
      emit('save');
      resetForm();
    };

    const resetForm = () => {
      Object.assign(form.value, { title: '', content: '', id: null });
      errors.value = { title: '', content: '' };
    };

    return { form, errors, handleSubmit, resetForm };
  },
};
</script>

<style scoped>
.form-row {
  min-height: 40vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding-top: 40px;
  padding-bottom: 40px;
}
.form-card {
  max-width: 600px;
  margin: 0 auto;
  border-radius: 18px;
  box-shadow: 0 6px 24px 0 #00000018;
  background: #fff;
}
.v-card-title {
  letter-spacing: 1px;
}
</style>