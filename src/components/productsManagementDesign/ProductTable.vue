<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-y-auto overflow-x-hidden max-h-130">
    <table class="w-full table-fixed text-left border-collapse">
      <colgroup>
        <col class="w-[26%]" />
        <col class="w-[15%]" />
        <col class="w-[11%]" />
        <col class="w-[10%]" />
        <col class="w-[16%]" />
        <col class="w-[22%]" />
      </colgroup>

      <thead class="sticky top-0 z-20 hidden bg-white md:table-header-group">
        <tr class="border-b border-gray-100">
          <th class="bg-white py-4 px-6 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Product</th>
          <th class="bg-white py-4 px-6 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Category</th>
          <th class="bg-white py-4 px-6 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Price</th>
          <th class="bg-white py-4 px-6 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Stock</th>
          <th class="bg-white py-4 px-6 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Status</th>
          <th class="bg-white py-4 px-6 text-right text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Actions</th>
        </tr>
      </thead>

      <tbody class="divide-y divide-gray-100">
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
