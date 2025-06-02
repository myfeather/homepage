<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="wrapper">
      <RouterLink to="/"><h1>一片羽</h1></RouterLink>
    <nav>
      <div class="nav-item"><RouterLink to="/download">下载</RouterLink></div>
      <!-- <div class="nav-item"><a href="http://docs.afeather.cn">文档</a></div> -->
    </nav>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: fit-content;
  color: rgb(255, 255, 255);
}

nav {
  width: fit-content;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: .5em;
}

.nav-item * {
  border: 1px solid rgba(255, 255, 255, 0);
  transition: all 0.3s ease-in-out;
  padding: .25em .5em;
  border-radius: 1em;
}

.nav-item :hover {
  backdrop-filter: blur(2px);
  /* padding: 0.5em 1em; */
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(255, 255, 255, 0.1);
}

h1 {
  font-size: 1em;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

a {
  color: rgb(255, 255, 255);
  text-decoration: none;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}
</style>
