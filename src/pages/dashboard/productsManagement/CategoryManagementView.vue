<template>
  <div class="bg-gray-200 p-6 rounded-lg h-full">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Category Management</h1>
    </div>

    <!-- Category Table -->
    <div class="bg-white rounded-xl shadow overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-4 text-left font-semibold">ID</th>
            <th class="p-4 text-left font-semibold">Category Name</th>
            <th class="p-4 text-left font-semibold">Products</th>
            <th class="p-4 text-left font-semibold">Status</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="category in categories"
            :key="category.id"
            class="border-t hover:bg-gray-50"
          >
            <td class="p-4">{{ category.id }}</td>

            <td class="p-4 font-medium">
              {{ category.name }}
            </td>

            <td class="p-4">
              {{ category.totalProducts }}
            </td>

            <td class="p-4">
              <span
                :class="
                  category.status === 'Active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                "
                class="px-3 py-1 rounded-full text-sm font-medium"
              >
                {{ category.status }}
              </span>
            </td>
          </tr>

          <!-- Empty State -->
          <tr v-if="categories.length === 0">
            <td colspan="4" class="p-6 text-center text-gray-500">
              No categories found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const categories = ref([
  {
    id: 1,
    name: "Beverages",
    totalProducts: 2,
    status: "Active",
  },
  {
    id: 2,
    name: "Snacks",
    totalProducts: 2,
    status: "Active",
  },
  {
    id: 3,
    name: "Food",
    totalProducts: 1,
    status: "Active",
  },
  {
    id: 4,
    name: "Dairy",
    totalProducts: 1,
    status: "Active",
  },
  {
    id: 5,
    name: "Bakery",
    totalProducts: 1,
    status: "Inactive",
  },
]);
</script>