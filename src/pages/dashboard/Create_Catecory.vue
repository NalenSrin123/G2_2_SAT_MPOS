<template>
  <main class="min-h-screen bg-gray-100 text-slate-900">
    <section
      class="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8"
    >
      <!-- Header -->
      <header
        class="flex flex-col gap-5 border-b border-slate-200 pb-5 lg:flex-row lg:items-end lg:justify-between"
      >
        <div class="space-y-3">
          <RouterLink
            to="/categories"
            class="inline-flex items-center gap-2 rounded-lg px-1 py-1 text-sm font-medium text-slate-600 transition hover:text-blue-700"
          >
            <span class="text-lg">&larr;</span>
            Back to Categories
          </RouterLink>

          <div>
            <h1 class="mt-1 text-3xl font-bold text-slate-950 sm:text-4xl">
              Create New Category
            </h1>

            <p
              class="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base"
            >
              Create a category to organize and manage your products.
            </p>
          </div>
        </div>

        <div class="flex flex-col-reverse gap-3 sm:flex-row">
          <button
            type="button"
            class="inline-flex h-11 items-center justify-center rounded-lg border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
          >
            Save as Draft
          </button>

          <button
            type="submit"
            form="create-category-form"
            class="inline-flex h-11 items-center justify-center rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
          >
            Create Category
          </button>
        </div>
      </header>

      <!-- Form -->
      <form
        id="create-category-form"
        class="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_350px]"
        @submit.prevent="createCategory"
      >
        <!-- Left -->
        <div class="space-y-6">
          <section
            class="rounded-lg border border-slate-200 bg-white shadow-sm"
          >
            <div class="border-b border-slate-100 p-5">
              <div class="icon">
                <i class="fa-solid fa-layer-group"></i>
              </div>

              <h2 class="mt-1 text-xl font-semibold text-slate-950">
                Category Information
              </h2>
            </div>

            <div class="space-y-5 p-5">
              <!-- Category Name -->
              <div>
                <label class="mb-2 block text-sm font-semibold text-slate-700">
                  Category Name
                </label>

                <input
                  v-model="name"
                  type="text"
                  placeholder="Enter category name"
                  class="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <!-- Parent Category -->
              <div>
                <div class="relative"></div>
              </div>
            </div>
          </section>
        </div>

        <!-- Right -->
        <aside class="space-y-6">
          <!-- Status -->
          <section
            class="rounded-lg border border-slate-200 bg-white shadow-sm h-61.5"
          >
            <div class="border-b border-slate-100 p-5">
              <h2 class="text-xl font-semibold text-slate-950">
                Category Status
              </h2>
            </div>

            <div class="space-y-5 p-5">
              <div
                class="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3"
              >
                <div>
                  <p class="font-semibold text-slate-700">Active Category</p>
                  <p class="text-xs text-slate-500">
                    Display category to users
                  </p>
                </div>

                <label class="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" checked class="peer sr-only" />

                  <span
                    class="relative h-6 w-11 rounded-full bg-slate-300 transition peer-checked:bg-blue-600 after:absolute after:left-[3px] after:top-[3px] after:h-[18px] after:w-[18px] after:rounded-full after:bg-white after:transition peer-checked:after:translate-x-5"
                  ></span>
                </label>
              </div>
            </div>
          </section>
        </aside>
      </form>
    </section>
  </main>
</template>
<style scoped>
.icon {
  color: rgb(37, 99, 235);
  font-size: 25px;
}
</style>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

const name = ref('');

const createCategory = async () => {
  try {
    const response = await axios.post(
      'https://g2-2-sat-pos-back.onrender.com/api/categories',
      {
        name: name.value,
      },
    );

    console.log(response.data);

    alert('Category created successfully!');

    router.push('/create_category');
  } catch (error) {
    console.error(error.response?.data || error);
    alert('Failed to create category');
  }
};
</script>
