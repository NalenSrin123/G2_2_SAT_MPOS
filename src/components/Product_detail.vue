<template>
  <div class="min-h-screen bg-gray-200 flex justify-center items-start sm:items-center p-0 sm:p-4">
    <!-- Product Card -->
    <div
      class="w-full max-w-sm sm:rounded-2xl sm:shadow-xl bg-[#f4faf5] overflow-hidden flex flex-col min-h-screen sm:min-h-0 sm:max-h-[90vh]"
    >
      <!-- Header -->
      <div class="h-14 shrink-0 bg-white flex items-center justify-between px-4 border-b border-gray-100">
        <button class="text-green-700 text-lg leading-none"><MoveLeftIcon /></button>
        <h1 class="font-semibold text-green-700 tracking-wide text-sm sm:text-base">
          LuxeDine 
        </h1>
        <button class="text-green-700 text-lg leading-none"><Bell /></button>
      </div>

      <!-- Scrollable content -->
      <div class="flex-1 overflow-y-auto">
        <!-- Product Image -->
        <div class="relative">
          <img
            src="https://images.unsplash.com/photo-1600891964092-4316c288032e"
            class="w-full h-44 sm:h-56 object-cover"
            alt="Grilled steak with rosemary"
          />
          <span
            class="absolute top-3 right-3 bg-green-700/90 text-white text-[10px] font-medium px-2.5 py-1 rounded-full tracking-wide"
          >
            CHEF'S PICK
          </span>
        </div>

        <!-- Content -->
        <div class="p-4">
          <!-- Doneness -->
<div class="mb-5 -mt-1 -mx-4 px-4">
  <div
    class="flex gap-2 overflow-x-auto pb-1 scrollbar-hide snap-x snap-mandatory"
  >
    <button
  v-for="option in donenessOptions" :key="option"
  @click="selectedDoneness = option"
  :class="[
    'shrink-0 snap-start whitespace-nowrap text-xs sm:text-sm py-2 px-4 rounded-full font-medium transition border',
    selectedDoneness === option
      ? 'bg-green-100 text-green-800 border-green-300'
      : 'bg-white text-gray-500 border-gray-200'
  ]"
>
  {{ option }}
</button>
  </div>
</div>

          <!-- Special Instructions -->
          <div>
            <h3 class="font-semibold text-sm mb-2 text-gray-800">
              Special Instructions
            </h3>
            <textarea
              v-model="instructions"
              placeholder="E.g. No salt, allergies, or sauce on the side..."
              class="w-full h-24 resize-none rounded-xl border border-gray-200 bg-white p-3 text-xs sm:text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600"
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Bottom Cart -->
      <div
        class="shrink-0 bg-white border-t border-gray-100 p-3 flex items-center gap-3"
      >
        <!-- Quantity -->
        <div
          class="flex items-center bg-gray-100 rounded-full px-1 py-1 gap-3 text-sm shrink-0"
        >
          <button
            @click="quantity = Math.max(1, quantity - 1)"
            class="w-7 h-7 flex items-center justify-center text-gray-600"
          >
            −
          </button>
          <span class="w-4 text-center">{{ quantity }}</span>
          <button
            @click="quantity++"
            class="w-7 h-7 flex items-center justify-center text-gray-600"
          >
            +
          </button>
        </div>

        <!-- Add Cart -->
        <button
          class="flex-1 bg-green-700 hover:bg-green-800 active:scale-[0.98] text-white rounded-full py-3 text-sm font-medium flex justify-center items-center gap-2 transition"
        >
          🛒 Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>

<script setup>
import { Bell, MoveLeftIcon, } from 'lucide-vue-next';
import { ref } from 'vue';

const donenessOptions = ref(['Rare', 'Medium Rare', 'Medium', 'Medium Well', 'Well Done']);
const selectedDoneness = ref('Medium Rare');
const quantity = ref(1);
const instructions = ref('');

</script>