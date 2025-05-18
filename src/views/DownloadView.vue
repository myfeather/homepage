<template>
  <div class="download-view">
    <div class="download-container">
      <h2>下载</h2>
      <div class="version-selector">
        <!-- <p>当前版本: v0.0.1</p> -->
        <div class="platforms">
          <Button style="cursor: not-allowed;">暂无可用下载</Button>
          <Button @click="download('windows')" hidden>Windows</Button>
          <Button @click="download('mac')" hidden>MacOS</Button>
          <Button @click="download('linux')" hidden>Linux</Button>
        </div>
      </div>
      <div class="changelog">
        <h3>更新日志</h3>
        <ul>
          <li>v0 软件尚未发布</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/Button.vue'

const download = (platform: string) => {
  // TODO: 实现下载逻辑
  console.log(`下载${platform}版本`)
}
</script>

<style scoped>
.download-view {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 100dvw;
}

.download-container {
  display: flex;
  flex-direction: column;
  gap: 2em;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 0 2em;
  background-color: rgba(255, 255, 255, 0.05);
}

h2 {
  color: rgb(255, 255, 255);
  font-family: '130-SS Zhui Guang Shou Xie Ti';
  font-size: 2em;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.version-selector {
  display: flex;
  flex-direction: column;
  gap: 1em;
  align-items: center;
}

.version-selector p {
  color: rgba(255,255,255, 0.8);
  font-size: 1.2em;
  font-weight: 500;
  margin-bottom: 0.5em;
}

.platforms {
  display: flex;
  gap: 1em;
}



.changelog {
  max-width: 600px;
  width: 100%;
  padding: 1em;
  background-color: rgba(255, 255, 255, 0.03);
  border-radius: 0.5em;
}

.changelog h3 {
  color: rgb(255, 255, 255);
  font-family: '130-SS Zhui Guang Shou Xie Ti';
  margin-bottom: 0.5em;
}

.changelog ul {
  color: rgba(255, 255, 255, 0.8);
  list-style-type: none;
}

.changelog li {
  margin-bottom: 0.5em;
  padding-left: 1em;
  position: relative;
}

.changelog li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: rgb(255, 169, 209);
}
</style>
