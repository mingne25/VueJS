<template>
  <div class="home-container">
    <h1>HELLO</h1>
    <router-link to="/projects" class="go-projects-btn">
      Go to Projects
    </router-link>
  </div>
</template>

<style scoped>
.home-container {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f4f6f8;
  border-radius: 12px;
  margin: 40px auto 0 auto;
  max-width: 500px;
  box-shadow: 0 4px 24px rgba(25, 118, 210, 0.08);
  padding: 48px 24px;
}

h1 {
  font-size: 2.2rem;
  color: #1976d2;
  margin-bottom: 32px;
  font-weight: 700;
  letter-spacing: 1px;
}

.go-projects-btn {
  display: inline-block;
  background: linear-gradient(90deg, #1976d2 0%, #42a5f5 100%);
  color: #fff;
  padding: 12px 32px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 500;
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.10);
  transition: background 0.2s, box-shadow 0.2s;
}
.go-projects-btn:hover {
  background: linear-gradient(90deg, #1565c0 0%, #1976d2 100%);
  box-shadow: 0 4px 16px rgba(25, 118, 210, 0.18);
}
</style>