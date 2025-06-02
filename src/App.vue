<script setup lang="ts">
import Nav from '@/components/Nav.vue'
import Footer from './components/Footer.vue'
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <main>
    <header>
      <Nav class="nav-container" />
    </header>
    <transition name="scale" mode="out-in">
      <router-view />
    </transition>
    <footer>
      <Footer now-year="2025" bg-provider="pixiv" class="footer" />
    </footer>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100dvh;
  width: 100dvw;
  background-image: url('/background/1.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

header,
footer {
  width: 100%;
  height: fit-content;
  user-select: none;
}

.nav-container {
  padding: 0.5em 2em;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
}

.footer {
  padding: 0.25em 0.5em;
}

.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s ease-in-out;
}

.scale-enter-from {
  transform: scale(0.8);
  opacity: 0;
}

.scale-leave-to {
  transform: scale(1.2);
  opacity: 0;
}

</style>
