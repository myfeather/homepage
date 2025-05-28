<template>
  <div class="auth-view">
    <div class="auth-container">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { onMounted } from 'vue'

</script>

<style scoped>
.auth-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.auth-container {
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  border-radius: 1em;
  padding: 2em;
  width: 60%;
  max-width: 500px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1em;
}
</style>
