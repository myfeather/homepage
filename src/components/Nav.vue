<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="wrapper">
    <RouterLink to="/"><h1>一片羽</h1></RouterLink>
    <nav>
      <RouterLink to="/download">下载</RouterLink>
      <a href="http://docs.afeather.cn">文档</a>
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
  gap: 1.5em;
}

h1 {
  font-size: 1em;
  margin: 0;
  padding: 0;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

a {
  color: rgb(255, 255, 255);
  text-decoration: none;
}

a:hover {
  color: rgb(255, 169, 209);
}
</style>
