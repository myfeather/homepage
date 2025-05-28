<script setup lang="ts">
import Sentence from "@/components/Sentence.vue";
</script>

<template>
    <div class="home-view">
      <div class="sentence-container">
        <Sentence provider="afeather"/>
      </div>
    </div>
</template>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 100%;
}

.sentence-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 0 2em;
}

</style>
