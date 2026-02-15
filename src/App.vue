<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import Nav from '@/components/Nav.vue'
import ParallaxWindow from '@/components/ParallaxWindow.vue'
import Footer from './components/Footer.vue'

type ParallaxWindowRef = {
  render: (offsetX?: number, offsetY?: number) => void
}

const backgroundParallax = ref<ParallaxWindowRef | null>(null)
let renderRaf = 0
let pointerOffsetX = 0
let pointerOffsetY = 0

const renderBackground = () => {
  renderRaf = 0
  backgroundParallax.value?.render(pointerOffsetX, pointerOffsetY)
}

const handlePointerMove = (event: PointerEvent) => {
  pointerOffsetX = (event.clientX / window.innerWidth - 0.5) * 2
  pointerOffsetY = (event.clientY / window.innerHeight - 0.5) * 2
  if (!renderRaf) renderRaf = requestAnimationFrame(renderBackground)
}

const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
  const gamma = event.gamma
  const beta = event.beta
  if (gamma === null || beta === null) return

  // Invert axes to correct movement direction
  // Gamma: Left/Right tilt (-90 to 90) -> Inverted
  pointerOffsetX = Math.max(-1, Math.min(1, -gamma / 45))

  // Beta: Front/Back tilt (-180 to 180) -> Inverted
  // Map 0 to 90 -> -1 to 1 (Assuming holding phone at 45 degrees is "center")
  pointerOffsetY = Math.max(-1, Math.min(1, -(beta - 45) / 45))

  if (!renderRaf) renderRaf = requestAnimationFrame(renderBackground)
}

const resetPointer = () => {
  pointerOffsetX = 0
  pointerOffsetY = 0
  if (!renderRaf) renderRaf = requestAnimationFrame(renderBackground)
}

onMounted(() => {
  backgroundParallax.value?.render(0, 0)
  window.addEventListener('pointermove', handlePointerMove)
  window.addEventListener('blur', resetPointer)
  window.addEventListener('deviceorientation', handleDeviceOrientation)
})

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', handlePointerMove)
  window.removeEventListener('blur', resetPointer)
  window.removeEventListener('deviceorientation', handleDeviceOrientation)
  if (renderRaf) cancelAnimationFrame(renderRaf)
})
</script>

<template>
  <main>
    <ParallaxWindow
      ref="backgroundParallax"
      class="background-window"
      src="/background/1.jpg"
      :view-height="0.2"
      :sensitivity-x="0.005"
      :sensitivity-y="0.005"
    />
    <div class="app-shell">
      <header>
        <Nav class="nav-container" />
      </header>
      <transition name="scale" mode="out-in">
        <router-view />
      </transition>
      <footer>
        <Footer now-year="2025" bg-provider="pixiv" class="footer" />
      </footer>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  min-height: 100%;
  width: 100%;
}

.background-window {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.background-window :deep(.image-like) {
  display: block;
  width: 100%;
  height: 100%;
}

.background-window :deep(.image-like-content) {
  display: block;
  width: 100%;
  height: 100%;
  aspect-ratio: auto !important;
  object-fit: cover;
}

.app-shell {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 100%;
  width: 100%;
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
