<template>
  <div class="bg-white rounded-lg overflow-y-auto overflow-x-hidden max-h-130">
    <table class="w-full table-fixed">
      <colgroup>
        <col class="w-[26%]" />
        <col class="w-[15%]" />
        <col class="w-[11%]" />
        <col class="w-[10%]" />
        <col class="w-[16%]" />
        <col class="w-[22%]" />
      </colgroup>

      <thead
        class="sticky top-0 z-20 hidden bg-gray-50 text-sm text-gray-500 shadow-sm md:table-header-group"
      >
        <tr>
          <th class="bg-gray-50 p-4 text-left whitespace-nowrap">Product</th>
          <th class="bg-gray-50 p-4 text-left whitespace-nowrap">Category</th>
          <th class="bg-gray-50 p-4 text-left whitespace-nowrap">Price</th>
          <th class="bg-gray-50 p-4 text-left whitespace-nowrap">Stock</th>
          <th class="bg-gray-50 p-4 text-left whitespace-nowrap">Status</th>
          <th class="bg-gray-50 p-4 text-left whitespace-nowrap">Actions</th>
        </tr>
      </thead>

      <tbody>
        <template v-if="products.length">
          <ProductItemRow
            v-for="product in products"
            :key="product.id"
            :product="product"
            @edit="$emit('edit', $event)"
            @remove="$emit('remove', $event)"
          />
        </template>

        <tr v-else>
          <td
            colspan="6"
            class="p-8 text-center text-sm font-medium text-gray-500"
          >
            Product not found
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import ProductItemRow from './ProductItemRow.vue'

defineProps({
  products: {
    type: Array,
    default: () => []
  }
})

defineEmits(['edit', 'remove'])
</script>
