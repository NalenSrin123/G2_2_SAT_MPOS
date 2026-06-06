<template>
  <tr class="border-t">
    <!-- Desktop / Tablet -->
    <template v-if="!isMobile">
      <td class="p-4">
        <div class="flex items-center gap-3">
          <img
            :src="product.image"
            :alt="product.name"
            class="w-10 h-10 rounded-lg object-cover"
          />

          <div>
            <p class="font-medium">
              {{ product.name }}
            </p>

            <p class="text-xs text-gray-500">
              {{ product.sku }}
            </p>
          </div>
        </div>
      </td>
      <td class="p-4">
        {{ product.category }}
      </td>
      <td class="p-4 font-medium">
        ${{ product.price }}
      </td>
      <td class="p-4">
        <span
          class="px-2 py-1 text-xs rounded-full"
          :class="
            product.stock === 0
              ? 'bg-red-100 text-red-700'
              : 'bg-green-100 text-green-700'
          "
        >
          {{ product.stock }}
        </span>
      </td>
      <td class="p-4">
        <span
          class="px-2 py-1 text-xs rounded-full"
          :class="
            product.status === 'Active'
              ? 'bg-green-100 text-green-700'
              : product.status === 'Low Stock'
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-gray-200 text-gray-700'
          "
        >
          {{ product.status }}
        </span>
      </td>
      <td class="p-4">
        <div class="flex gap-2">
          <button
            @click="$emit('edit', product)"
            class="px-3 py-1 text-xs bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            @click="$emit('remove', product)"
            class="px-3 py-1 text-xs bg-red-500 text-white rounded-lg hover:bg-red-600"
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
      <div class="border rounded-xl p-4 bg-white shadow-sm">

        <div class="flex items-center gap-3">
          <img
            :src="product.image"
            :alt="product.name"
            class="w-14 h-14 rounded-lg object-cover"
          />

          <div>
            <h3 class="font-semibold">
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
              class="inline-block px-2 py-1 text-xs rounded-full"
              :class="
                product.stock === 0
                  ? 'bg-red-100 text-red-700'
                  : 'bg-green-100 text-green-700'
              "
            >
              {{ product.stock }}
            </span>
          </div>

          <div>
            <p class="text-gray-500">Status</p>

            <span
              class="inline-block px-2 py-1 text-xs rounded-full"
              :class="
                product.status === 'Active'
                  ? 'bg-green-100 text-green-700'
                  : product.status === 'Low Stock'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-gray-200 text-gray-700'
              "
            >
              {{ product.status }}
            </span>
          </div>

        </div>

        <div class="flex gap-2 mt-4">
          <button
            @click="$emit('edit', product)"
            class="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Edit
          </button>

          <button
            @click="$emit('remove', product)"
            class="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
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