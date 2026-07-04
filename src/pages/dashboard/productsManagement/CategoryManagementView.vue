<template>
  <div class="p-6">

    <!-- Title -->
    <div class="mb-6">
      <h1 class="text-3xl font-bold">Categories</h1>
      <router-link to="/create_category" class="text-blue-500 hover:text-blue-700">
        Add category
      </router-link>
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
                   type="button"
                   @click="openDeleteModal(category)"
                    class="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg text-sm"
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

  <!-- Delete Modal -->
<div
  v-if="showDeleteModal"
  class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
>
  <div class="bg-white rounded-xl shadow-xl w-100">

    <!-- Header -->
    <div class="flex justify-between items-center border-b px-6 py-4">
      <h2 class="text-xl font-bold text-red-600">
        Delete Category
      </h2>

      <button
        type="button"
        @click="closeDeleteModal"
        class="text-gray-500 hover:text-black text-xl"
      >
        ✕
      </button>
    </div>

    <!-- Body -->
    <div class="px-6 py-5">
      <p class="text-gray-600">
        Are you sure you want to delete
      </p>

      <p class="font-bold text-lg mt-2">
        {{ selectedCategory?.name }}
      </p>

      <p class="text-sm text-red-500 mt-4">
        This action cannot be undone.
      </p>
    </div>

    <!-- Footer -->
    <div class="flex justify-end gap-3 border-t px-6 py-4">
      <button
        type="button"
        @click="closeDeleteModal"
        class="px-4 py-2 rounded-lg border hover:bg-gray-100"
      >
        Cancel
      </button>

      <button
        type="button"
        @click="deleteCategory"
        class="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
      >
        Delete
      </button>
    </div>

  </div>
</div>

  <!-- Success Modal -->
<div
  v-if="showSuccessModal"
  class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
>
  <div class="bg-white rounded-xl shadow-xl w-100">

    <!-- Header -->
    <div class="flex justify-between items-center border-b px-6 py-4">
      <h2 class="text-xl font-bold text-green-600">
        Success
      </h2>

      <button
        type="button"
        @click="closeSuccessModal"
        class="text-gray-500 hover:text-black text-xl"
      >
        ✕
      </button>
    </div>

    <!-- Body -->
    <div class="px-6 py-5">
      <div class="flex items-center gap-3">
        <div class="text-3xl text-green-600">✓</div>
        <p class="text-gray-600">
          {{ successMessage }}
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div class="flex justify-end border-t px-6 py-4">
      <button
        type="button"
        @click="closeSuccessModal"
        class="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
      >
        OK
      </button>
    </div>

  </div>
</div>


</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import api from "@/services/api";
const categories = ref([]);
const showDeleteModal = ref(false);
const selectedCategory = ref(null);
const showSuccessModal = ref(false);
const successMessage = ref("");

const fetchCategories = async () => {
  try {
    // will change the url to the backend api once it is ready
    const response = await api.get(
      "/categories"
    );

    categories.value = response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

onMounted(() => {
  console.log("Component mounted");
  fetchCategories();
});

// Watch for unexpected changes to showSuccessModal
watch(showSuccessModal, (newVal, oldVal) => {
  console.log(`showSuccessModal changed from ${oldVal} to ${newVal}`);
  if (!newVal && oldVal) {
    console.trace("Modal is being closed! Stack trace:");
  }
});

const openDeleteModal = (category) => {
  console.log(category)
  selectedCategory.value = category;
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  console.log("Closing delete modal");
  showDeleteModal.value = false;
  selectedCategory.value = null;
};

const openSuccessModal = (message) => {
  console.log("Opening success modal with message:", message);
  successMessage.value = message;
  showSuccessModal.value = true;
};

const closeSuccessModal = () => {
  console.log("Closing success modal");
  successMessage.value = "";
  showSuccessModal.value = false;
};

const deleteCategory = async () => {
  if (!selectedCategory.value) return;

  try {
    const id = selectedCategory.value.id;
    const name = selectedCategory.value.name;

    await api.delete(`/categories/${id}`);

    categories.value = categories.value.filter(
      (item) => item.id !== id
    );

    openSuccessModal(`Category "${name}" has been deleted successfully.`);
    closeDeleteModal();
    
  } catch (error) {
    console.error("Error deleting category:", error);
    alert("Failed to delete category.");
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
</script>



