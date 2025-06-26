<template>
  <Teleport to="body">
    <div class="modal-backdrop" @click.self="onCancel">
      <div class="modal-content">
        <h3 class="modal-title">{{ title }}</h3>
        <p class="modal-message">{{ message }}</p>
        <div class="modal-actions">
          <button class="modal-btn confirm" @click="onConfirm">Xác nhận</button>
          <button class="modal-btn cancel" @click="onCancel">Hủy</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
defineProps(['title', 'message']);
const emit = defineEmits(['confirm', 'cancel']);
const onConfirm = () => emit('confirm');
const onCancel = () => emit('cancel');
</script>

<style scoped>
.modal-backdrop {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.25); display: flex; align-items: center; justify-content: center;
  z-index: 1000;
}
.modal-content {
  background: #fff; padding: 20px 28px; border-radius: 8px; min-width: 260px;
  box-shadow: 0 4px 24px #0002;
  text-align: center;
}
.modal-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 12px;
}
.modal-message {
  margin-bottom: 18px;
  color: #444;
}
.modal-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
}
.modal-btn {
  padding: 8px 20px;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.18s;
}
.modal-btn.confirm {
  background: #2563eb;
  color: #fff;
}
.modal-btn.confirm:hover {
  background: #1d4ed8;
}
.modal-btn.cancel {
  background: #e5e7eb;
  color: #222;
}
.modal-btn.cancel:hover {
  background: #cbd5e1;
}
</style>