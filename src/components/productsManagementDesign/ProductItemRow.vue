<template>
  <tr class="group hover:bg-gray-50/50 transition-colors">
    <!-- Desktop / Tablet -->
    <template v-if="!isMobile">
      <td class="py-4 px-6 align-top">
        <div class="flex items-center gap-3">
          <img
            :src="product.image"
            :alt="product.name"
            class="w-10 h-10 rounded-full object-cover ring-1 ring-gray-100"
          />

          <div class="min-w-0 mt-0.5">
            <p class="text-sm font-bold text-gray-800 truncate">
              {{ product.name }}
            </p>

            <p class="text-xs font-medium text-gray-400">
              {{ product.sku }}
            </p>
          </div>
        </div>
      </td>
      <td class="py-4 px-6 align-top">
        <div class="text-sm font-medium text-gray-700 mt-1">
          {{ product.category }}
        </div>
      </td>
      <td class="py-4 px-6 align-top">
        <div class="text-sm font-black text-gray-900 mt-1">
          ${{ product.price }}
        </div>
      </td>
      <td class="py-4 px-6 align-top">
        <span
          class="inline-flex min-w-10 justify-center px-3 py-1 text-[10px] uppercase font-bold rounded-md tracking-wider mt-1"
          :class="
            product.stock === 0
              ? 'bg-[#fee2e2] text-[#991b1b]'
              : product.stock <= 10
              ? 'bg-[#fee2e2] text-[#991b1b]'
              : 'bg-[#dcfce7] text-[#166534]'
          "
        >
          {{ product.stock }}
        </span>
      </td>
      <td class="py-4 px-6 align-top">
        <div class="mt-1">
          <StatusBadge :status="product.status" />
        </div>
      </td>
      <td class="py-4 px-6 align-top text-right">
        <div class="flex justify-end gap-3 mt-1">
          <button
            @click="$emit('edit', product)"
            class="px-3 py-1.5 rounded-md bg-[#002f87] text-white font-bold text-xs shadow-sm hover:bg-blue-900 transition-colors"
          >
            Edit
          </button>
          <button
            @click="$emit('remove', product)"
            class="px-3 py-1.5 rounded-md bg-red-600 text-white font-bold text-xs shadow-sm hover:bg-red-700 transition-colors"
          >
            Remove
          </button>
        </div>
      </td>
    </template>

    <!-- Mobile -->
    <td
      v-else
      colspan="6"
      class="p-3"
    >
      <div class="w-full transition-transform duration-200 rounded-xl p-4 bg-white shadow-sm">

        <div class="flex items-center gap-3">
          <img
            :src="product.image"
            :alt="product.name"
            class="w-14 h-14 rounded-full object-cover ring-1 ring-gray-100"
          />

          <div>
            <h3 class="font-bold text-gray-800">
              {{ product.name }}
            </h3>

            <p class="text-xs text-gray-500">
              {{ product.sku }}
            </p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 mt-4 text-sm">

          <div>
            <p class="text-gray-500">Category</p>
            <p class="font-medium">{{ product.category }}</p>
          </div>

          <div>
            <p class="text-gray-500">Price</p>
            <p class="font-medium">${{ product.price }}</p>
          </div>

          <div>
            <p class="text-gray-500">Stock</p>

            <span
              class="inline-flex min-w-10 justify-center px-3 py-1 text-[10px] uppercase font-bold rounded-md tracking-wider"
              :class="
                product.stock === 0
                  ? 'bg-[#fee2e2] text-[#991b1b]'
                  : product.stock <= 10
                  ? 'bg-[#fee2e2] text-[#991b1b]'
                  : 'bg-[#dcfce7] text-[#166534]'
              "
            >
              {{ product.stock }}
            </span>
          </div>

          <div>
            <p class="text-gray-500">Status</p>

            <StatusBadge :status="product.status" />
          </div>

        </div>

        <div class="flex gap-2 mt-4">
          <button
            @click="$emit('edit', product)"
            class="flex-1 py-2 bg-[#002f87] text-white rounded-lg hover:bg-blue-900"
          >
            Edit
          </button>

          <button
            @click="$emit('remove', product)"
            class="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Remove
          </button>
        </div>

      </div>
    </td>
  </tr>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import StatusBadge from './StatusBadge.vue'

defineProps({
  product: {
    type: Object,
    required: true
  }
})

defineEmits(['edit', 'remove'])

const isMobile = ref(false)

const checkScreen = () => {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  checkScreen()
  window.addEventListener('resize', checkScreen)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreen)
})
</script>
