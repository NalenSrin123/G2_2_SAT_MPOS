<template>
  <div class="bg-white border rounded-lg overflow-hidden">
    <table class="w-full">
      <thead
        class="hidden md:table-header-group bg-gray-50 text-sm text-gray-500"
      >
        <tr>
          <th class="p-4 text-left">Product</th>
          <th class="p-4 text-left">Category</th>
          <th class="p-4 text-left">Price</th>
          <th class="p-4 text-left">Stock</th>
          <th class="p-4 text-left">Status</th>
          <th class="p-4 text-left">Actions</th>
        </tr>
      </thead>

      <tbody class="border-t">
        <ProductItemRow
          v-for="product in products"
          :key="product.id"
          :product="product"
          @edit="$emit('edit', $event)"
          @remove="$emit('remove', $event)"
        />
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