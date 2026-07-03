<script setup>
import { ref, onMounted } from "vue";
import api from "@/services/api";


const categories = ref([]);
const loading = ref(false);
const error = ref("");

const fetchCategories = async () => {
  loading.value = true;
  error.value = "";

  try {
    const response = await api.get("/categories");

    console.log(response.data);

    categories.value = response.data;
  } catch (err) {
    console.error(err);
    error.value = "Failed to load categories.";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchCategories();
});
</script>

<template>
  <div class="p-6">

    <!-- Title -->
    <div class="mb-6">
      <h1 class="text-3xl font-bold">Categories</h1>
      <p class="text-gray-500">
        List of all categories from API
      </p>
    </div>

    <!-- Loading -->
    <div
      v-if="loading"
      class="text-center py-10 text-blue-600 font-semibold"
    >
      Loading...
    </div>

    <!-- Error -->
    <div
      v-if="error"
      class="text-center py-10 text-red-600"
    >
      {{ error }}
    </div>
    <!-- Table -->
    <div
      v-if="!loading"
      class="bg-white rounded-xl border border-gray-300 overflow-hidden"
    >
      <table class="w-full">
        <thead class="bg-gray-100 border-b">
          <tr>
            <th class="p-4 text-left font-semibold">ID</th>
            <th class="p-4 text-left font-semibold">Category Name</th>
            <th class="p-4 text-left font-semibold">Products</th>
            <th class="p-4 text-left font-semibold">Status</th>
            <th class="p-4 text-center font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
      
          <tr
            v-for="category in categories"
            :key="category.id"
            class="border-b hover:bg-gray-50"
          >
            <!-- ID -->
            <td class="p-4">
              {{ category.id }}
            </td>

            <!-- Category Name -->
            <td class="p-4">
              <div>
                <p class="font-semibold text-gray-900">
                  {{ category.name }}
                </p>

                <p class="text-sm text-gray-500">
                  CAT-{{ String(category.id).padStart(3, "0") }}
                </p>
              </div>
            </td>
            <!-- Products -->
            <td class="p-4">
              <span
                class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
              >
                {{ category.totalProducts ?? 0 }}
              </span>
            </td>

            <!-- Status -->
            <td class="p-4">
              <span
                class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
              >
                {{ category.status ?? "Active" }}
              </span>
            </td>
            <!-- Actions -->
            <td class="p-4">
              <div class="flex justify-center gap-2">
                <button
                  class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg"
                >
                  Edit
                </button>
                <button
                  class="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
          <!-- Empty -->
          <tr v-if="categories.length === 0">
            <td
              colspan="5"
              class="text-center py-6 text-gray-500"
            >
              No categories found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>