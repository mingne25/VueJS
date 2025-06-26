<template>
  <div class="home-container">
    <h1 class="home-title">Quản lý Công việc</h1>
    <router-link to="/tasks">
      <button class="home-btn">Đến Danh sách Công việc</button>
    </router-link>
  </div>
</template>

<script setup>
</script>

<style scoped>
.home-container {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%);
  border-radius: 16px;
  box-shadow: 0 4px 24px #0001;
  padding: 48px 16px;
}
.home-title {
  font-size: 2.2rem;
  font-weight: bold;
  color: #2563eb;
  margin-bottom: 2rem;
  letter-spacing: 1px;
  text-align: center;
}
.home-btn {
  background: #2563eb;
  color: #fff;
  padding: 14px 32px;
  border: none;
  border-radius: 8px;
  font-size: 1.15rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px #0001;
  transition: background 0.18s;
}
.home-btn:hover {
  background: #1d4ed8;
}
</style>