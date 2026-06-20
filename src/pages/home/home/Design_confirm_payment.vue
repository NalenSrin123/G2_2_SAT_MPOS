<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">

    <!-- Card -->
    <div class="w-full max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden">

      <!-- Header -->
      <div class="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <button class="text-gray-600 hover:text-gray-800 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div class="text-center">
          <h1 class="font-semibold text-gray-800 text-base">Scan to Pay</h1>
          <div class="h-1 w-10 bg-emerald-500 mx-auto mt-1 rounded-full"></div>
        </div>

        <button class="text-gray-600 hover:text-gray-800 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
      </div>

      <!-- Amount Section -->
      <div class="px-5 pt-5">
        <div class="bg-gray-50 rounded-xl p-4 border border-gray-100">
          <div class="flex items-center justify-between">
            <p class="text-gray-500 text-xs font-medium tracking-wider">TOTAL AMOUNT</p>
            <span class="bg-emerald-100 text-emerald-700 text-xs px-2.5 py-1 rounded-full font-medium">
              TABLE 14
            </span>
          </div>

          <h2 class="text-3xl font-bold text-emerald-600 mt-1.5">
            ${{ totalAmount }}
          </h2>

          <p class="text-xs text-gray-500 mt-2">
            Order #LX-8892 • LuxeDine Signature
          </p>
        </div>
      </div>

      <!-- QR Section -->
      <div class="px-5 mt-5">
        <div class="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col items-center">

          <!-- QR frame -->
          <div class="w-40 h-40 bg-emerald-900 rounded-xl flex items-center justify-center">
            <div class="bg-white p-2 rounded-lg">
              <!-- Display your Thai QR code image -->
              <img 
                ref="qrImageRef"
                :src="qrImageUrl" 
                alt="Thai QR Code" 
                class="w-24 h-24 object-contain"
                crossorigin="anonymous"
                @error="handleImageError"
                @load="onImageLoad"
              />
            </div>
          </div>

          <h3 class="mt-4 font-semibold text-gray-800 text-sm">Payment Code</h3>

          <p class="text-xs text-gray-500 text-center mt-1 max-w-50">
            Open your banking app and scan this QR code to complete payment
          </p>

          <!-- Buttons -->
          <div class="flex gap-3 mt-4 w-full">
            <button 
              @click="saveQR" 
              class="flex-1 border border-gray-200 rounded-lg py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
            >
              Save QR
            </button>
            <button 
              @click="shareQR" 
              class="flex-1 border border-gray-200 rounded-lg py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
            >
              Share
            </button>
          </div>
        </div>
      </div>

      <!-- Bottom Button -->
      <div class="p-5">
        <button class="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl font-semibold transition-all duration-200 shadow-sm flex items-center justify-center gap-2 text-base">
          I have paid
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <!-- Countdown Timer (optional) -->
      <div v-if="showTimer" class="px-5 pb-4 -mt-2 text-center">
        <span class="text-xs text-gray-400 font-mono">
          QR expires in {{ formattedTime }}
        </span>
      </div>

    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import qrImage from '@/assets/Qr_code.jpg'

const totalAmount = ref('200.60')
const showTimer = ref(true)
const timeLeft = ref(298)
const qrImageRef = ref(null)
const imageLoaded = ref(false)

const qrImageUrl = ref(qrImage)

const formattedTime = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60)
  const seconds = timeLeft.value % 60

  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`
})

let timer = null

const onImageLoad = () => {
  imageLoaded.value = true
}

const handleImageError = () => {
  console.error('Failed to load QR image')
}

const startTimer = () => {
  timer = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      clearInterval(timer)
    }
  }, 1000)
}

const saveQR = async () => {
  try {
    const response = await fetch(qrImageUrl.value)
    const blob = await response.blob()

    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'thai-qr-code.jpg'

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    URL.revokeObjectURL(link.href)
  } catch (error) {
    console.error('Save failed:', error)
  }
}

const shareQR = async () => {
  try {
    const response = await fetch(qrImageUrl.value)
    const blob = await response.blob()

    const file = new File(
      [blob],
      'thai-qr-code.jpg',
      { type: blob.type }
    )

    // Mobile devices with file sharing support
    if (
      navigator.share &&
      navigator.canShare &&
      navigator.canShare({ files: [file] })
    ) {
      await navigator.share({
        title: 'Thai Payment QR',
        text: `Order #LX-8892 • $${totalAmount.value}`,
        files: [file]
      })

      return
    }

    // Fallback: Copy payment info
    await navigator.clipboard.writeText(
      `Order #LX-8892 • Amount: $${totalAmount.value}`
    )

    alert('Sharing not supported. Payment info copied to clipboard.')
  } catch (error) {
    console.error('Share failed:', error)

    alert(
      'Unable to share. Please use a mobile browser that supports file sharing.'
    )
  }
}

onMounted(() => {
  startTimer()
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>