import { ref, watch } from 'vue';

const notes = ref(JSON.parse(localStorage.getItem('notes')) || []);

watch(notes, (newNotes) => {
  localStorage.setItem('notes', JSON.stringify(newNotes));
}, { deep: true });

export function useNotes() {
  const addNote = (note) => {
    notes.value.push({
      id: Date.now(),
      title: note.title || '',
      content: note.content || '',
      createdAt: new Date().toISOString(),
    });
  };

  const updateNote = (id, updatedNote) => {
    const index = notes.value.findIndex((n) => n.id === id);
    if (index !== -1) notes.value[index] = { ...notes.value[index], ...updatedNote };
  };

  const deleteNote = (id) => {
    notes.value = notes.value.filter((n) => n.id !== id);
  };

  const getNoteById = (id) => {
    return notes.value.find((n) => n.id === id) || null;
  };

  return { notes, addNote, updateNote, deleteNote, getNoteById };
}