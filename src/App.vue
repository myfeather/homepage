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
let targetOffsetX = 0
let targetOffsetY = 0
const showGyroscopeButton = ref(false)

const lerp = (start: number, end: number, factor: number) => {
  return start + (end - start) * factor
}

const renderBackground = () => {
  // Smoothly interpolate current offset towards target offset
  // Factor 0.1 gives a smooth, weighted movement
  pointerOffsetX = lerp(pointerOffsetX, targetOffsetX, 0.1)
  pointerOffsetY = lerp(pointerOffsetY, targetOffsetY, 0.1)

  backgroundParallax.value?.render(pointerOffsetX, pointerOffsetY)
  
  // Continue animation loop if there's still significant difference or to keep updating
  // For gyroscope, we want continuous updates, but we can optimize by checking diff
  if (Math.abs(targetOffsetX - pointerOffsetX) > 0.001 || Math.abs(targetOffsetY - pointerOffsetY) > 0.001) {
      renderRaf = requestAnimationFrame(renderBackground)
  } else {
      renderRaf = 0
  }
}

const handlePointerMove = (event: PointerEvent) => {
  targetOffsetX = (event.clientX / window.innerWidth - 0.5) * 2
  targetOffsetY = (event.clientY / window.innerHeight - 0.5) * 2
  if (!renderRaf) renderRaf = requestAnimationFrame(renderBackground)
}

const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
  const gamma = event.gamma
  const beta = event.beta
  if (gamma === null || beta === null) return

  // Invert axes to correct movement direction
  // Gamma: Left/Right tilt (-90 to 90) -> Inverted
  targetOffsetX = Math.max(-1, Math.min(1, -gamma / 30))

  // Beta: Front/Back tilt (-180 to 180) -> Inverted
  // Map 0 to 90 -> -1 to 1 (Assuming holding phone at 45 degrees is "center")
  targetOffsetY = Math.max(-1, Math.min(1, -(beta - 45) / 30))

  if (!renderRaf) renderRaf = requestAnimationFrame(renderBackground)
}

const resetPointer = () => {
  targetOffsetX = 0
  targetOffsetY = 0
  if (!renderRaf) renderRaf = requestAnimationFrame(renderBackground)
}

const initGyroscope = async () => {
  if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
    // iOS 13+ requires permission
    try {
      const permissionState = await (DeviceOrientationEvent as any).requestPermission()
      if (permissionState === 'granted') {
        window.addEventListener('deviceorientation', handleDeviceOrientation)
        showGyroscopeButton.value = false
        // Optional: Alert success for debugging, can be removed later
        // alert('Gyroscope permission granted')
      } else {
        alert(`Gyroscope permission denied: ${permissionState}`)
      }
    } catch (error) {
      alert(`Gyroscope permission error: ${error}`)
    }
  } else {
    // Non-iOS 13+ devices
    window.addEventListener('deviceorientation', handleDeviceOrientation)
  }
}

const handleUserInteraction = () => {
  initGyroscope()
  // window.removeEventListener('click', handleUserInteraction)
}

onMounted(() => {
  backgroundParallax.value?.render(0, 0)
  window.addEventListener('pointermove', handlePointerMove)
  window.addEventListener('blur', resetPointer)
  
  // Try to init gyroscope immediately (for Android/older iOS)
  if (typeof (DeviceOrientationEvent as any).requestPermission !== 'function') {
    window.addEventListener('deviceorientation', handleDeviceOrientation)
  } else {
    // For iOS 13+, show button
    showGyroscopeButton.value = true
    // Also keep click listener as backup/easier access? No, let's use the button explicitly
    // window.addEventListener('click', handleUserInteraction)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', handlePointerMove)
  window.removeEventListener('blur', resetPointer)
  window.removeEventListener('deviceorientation', handleDeviceOrientation)
  // window.removeEventListener('click', handleUserInteraction)
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
      :sensitivity-x="0.02"
      :sensitivity-y="0.02"
    />
    <div v-if="showGyroscopeButton" class="gyro-button-container">
      <button class="gyro-button" @click="handleUserInteraction">Enable Motion</button>
    </div>
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
  /* iOS Safe Area Support */
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
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

.gyro-button-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
}

.gyro-button {
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 30px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.gyro-button:active {
  transform: scale(0.95);
  background: rgba(255, 255, 255, 0.3);
}
</style>
