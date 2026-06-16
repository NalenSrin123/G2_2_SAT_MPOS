<template>
  <div
    class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full p-4 "
  >
    <!-- Left Section -->
    <div>
      <h1 class="text-xl sm:text-2xl font-bold">
        Products Management
      </h1>
      <p class="text-sm sm:text-base text-gray-600 mt-1">
        Manage inventory, monitor stock levels, and maintain POS products.
      </p>
    </div>

    <!-- Right Section -->
    <div class="w-full md:w-auto">
      <button
      @click="emit('add-product')"
        class="w-full md:w-auto bg-blue-900 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <router-link to="/add_new_products">
          Add New Product
        </router-link>
      </button>
    </div>
  </div>
</template>

<script setup>

const emit = defineEmits(['add-product'])
</script>