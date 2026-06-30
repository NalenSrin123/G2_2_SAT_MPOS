<template>
  <div class="bg-white  rounded-lg p-3 flex justify-between items-center">

    <p class="text-sm text-gray-500">
      Showing {{ start }} - {{ end }} of {{ total }}
    </p>

    <div class="flex gap-2">
      <button
        @click="$emit('previous')"
        :disabled="currentPage === 1"
      >
        ‹
      </button>

      <button
        v-for="page in pages"
        :key="page"
        @click="$emit('change-page', page)"
        :class="currentPage === page ? 'bg-blue-600 text-white' : 'border'"
        class="w-8 h-8 rounded"
      >
        {{ page }}
      </button>

      <button
        @click="$emit('next')"
        :disabled="currentPage === pages.length"
      >
        ›
      </button>
    </div>

  </div>
</template>

<script setup>
defineProps({
  currentPage: Number,
  pages: Array,
  total: Number,
  start: Number,
  end: Number
})

defineEmits(['change-page', 'previous', 'next'])
</script>