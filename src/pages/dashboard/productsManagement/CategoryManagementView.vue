<template>
  <div class="bg-gray-200 p-6 rounded-lg h-full">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Category Management</h1>
      <RouterLink
        to="/create_category"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Create Category
      </RouterLink>
    </div>

    <div v-if="loading" class="text-center py-4">Loading categories...</div>

    <div v-else-if="error" class="text-center text-red-500 py-4">
      {{ error }}
    </div>
    <!-- Category Table -->
    <div
      v-else
      class="bg-white rounded-xl border border-gray-300 overflow-hidden"
    >
      <!-- table -->
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
                {{ category.totalProducts }}
              </span>
            </td>

            <!-- Status -->
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

            <!-- Actions -->
            <td class="p-4">
              <div class="flex justify-center gap-2">
                <button
                  @click="
                    updateCategory(category.id, {
                      name: category.name,
                      status: category.status,
                    })
                  "
                  class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg text-sm"
                >
                  Edit
                </button>

                <button
                  class="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg text-sm"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>

          <!-- Empty State -->
          <tr v-if="categories.length === 0">
            <td colspan="5" class="p-6 text-center text-gray-500">
              No categories found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/services/api";

const categories = ref([]);
const loading = ref(false);
const error = ref("");

const fetchCategories = async () => {
  loading.value = true;

  try {
    const { data } = await api.get("/categories");
    categories.value = data;
  } catch (err) {
    error.value = "Failed to load categories.";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const updateCategory = async (id, categoryData) => {
  try {
    console.log("Updating:", id, categoryData);

    const response = await api.put(`/categories/${id}`, categoryData);

    console.log("Status:", response.status);
    console.log("Response:", response.data);

    await fetchCategories();
  } catch (error) {
    console.error("Update failed:", error);

    if (error.response) {
      console.log("Status:", error.response.status);
      console.log("Response:", error.response.data);
    }
  }
};

onMounted(fetchCategories);


</script>
