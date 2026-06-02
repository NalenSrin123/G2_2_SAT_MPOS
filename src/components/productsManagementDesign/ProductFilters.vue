<template>
  <div
    class="bg-white border rounded-xl p-4 flex flex-col lg:flex-row gap-4 justify-between shadow-sm"
  >
    <div class="flex flex-wrap gap-2 items-center">
      <button
        v-for="category in categories"
        :key="category"
        @click="$emit('change-category', category)"
        class="px-4 py-2 rounded-full text-sm border transition"
        :class="
          selectedCategory === category
            ? 'bg-blue-600 text-white border-blue-600'
            : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200'
        "
      >
        {{ category }}
      </button>
    </div>

    <div
      class="w-full lg:w-auto flex flex-col md:flex-row gap-3 items-stretch md:items-center"
    >
      <div class="relative w-full sm:w-64">
        <input
          v-model="search"
          @input="$emit('search', search)"
          placeholder="Search products..."
          class="w-full border pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5 absolute left-3 top-2.5 text-gray-400"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m21 21-5.197-5.197M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
          />
        </svg>
      </div>

      <div class="relative w-full sm:w-64">
        <button
          @click="open = !open"
          class="w-full border px-3 py-2 rounded-lg flex justify-between items-center hover:bg-gray-50"
        >
          <span class="text-sm text-gray-700">
            {{ sortLabel }}
          </span>

          <svg
            class="w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div
          v-if="open"
          class="absolute z-50 mt-2 w-full bg-white border rounded-lg shadow-lg p-2 space-y-2"
        >
          <div class="text-xs font-bold text-gray-500 px-2">Price</div>

          <button
            @click="selectSort('price_desc')"
            class="w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-sm"
          >
            Price High → Low
          </button>

          <button
            @click="selectSort('price_asc')"
            class="w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-sm"
          >
            Price Low → High
          </button>

          <div class="text-xs font-bold text-gray-500 px-2 mt-2">Stock</div>

          <button
            @click="selectSort('stock_desc')"
            class="w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-sm"
          >
            Stock High → Low
          </button>

          <button
            @click="selectSort('stock_asc')"
            class="w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-sm"
          >
            Stock Low → High
          </button>
        </div>
      </div>

      <button
        @click="resetFilters"
        class="w-full md:w-auto px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm"
      >
        Reset
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const props = defineProps({
  selectedCategory: String,
  sortOption: String
})

const emit = defineEmits([
  'change-category',
  'search',
  'sort-option'
])

const search = ref('')
const open = ref(false)
const currentSort = ref('')

const categories = [
  'All Products',
  'Electronics',
  'Home Office',
  'Accessories',
  'Peripherals'
]

onMounted(() => {
  const saved = localStorage.getItem('sortOption')

  if (saved) {
    currentSort.value = saved
    emit('sort-option', saved)
  }
})

watch(
  () => props.sortOption,
  (val) => {
    currentSort.value = val
  },
  { immediate: true }
)

const selectSort = (value) => {
  currentSort.value = value
  localStorage.setItem('sortOption', value)
  emit('sort-option', value)
  open.value = false
}

const resetFilters = () => {
  search.value = ''
  currentSort.value = ''
  localStorage.removeItem('sortOption')

  emit('search', '')
  emit('change-category', 'All Products')
  emit('sort-option', '')

  open.value = false
}

// sort label based on current sort option
const sortLabel = computed(() => {
  switch (currentSort.value) {
    case 'price_asc':
      return 'Price Low → High'
    case 'price_desc':
      return 'Price High → Low'
    case 'stock_asc':
      return 'Stock Low → High'
    case 'stock_desc':
      return 'Stock High → Low'
    default:
      return 'Sort By'
  }
})
</script>