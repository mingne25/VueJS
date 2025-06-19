<template>
  <nav class="navbar">
    <div class="brand">Project Manager</div>
    <div class="links">
      <router-link to="/">Home</router-link>
      <router-link to="/projects">Projects</router-link>
      <router-link to="/projects/new" class="add-btn">Add</router-link>
    </div>
  </nav>
</template>

<style>
.navbar {
  background-color: #1976d2;
  color: white;
  padding: 16px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.navbar .links a {
  color: white;
  text-decoration: none;
  margin-left: 16px;
}
.navbar .links .add-btn {
  background-color: white;
  color: #1976d2;
  padding: 6px 12px;
  border-radius: 4px;
}
.navbar .brand {
  font-weight: bold;
  font-size: 18px;
}
</style>
