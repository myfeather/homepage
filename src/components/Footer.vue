<template>
  <div class="footer">
      <p>© 2023-{{props.nowYear}} Feather Dev all rights reserved.</p>

      <p>背景由 @{{props.bgProvider}} 提供</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  nowYear: string
  bgProvider: string
}>()
</script>

<style scoped>
.footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: fit-content;
  gap: 0.5em;
}

p {
  font-family: '130-SS Zhui Guang Shou Xie Ti';
  font-size: 0.5em;
  color: rgba(255, 255, 255, 0.4);
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
}
</style>
