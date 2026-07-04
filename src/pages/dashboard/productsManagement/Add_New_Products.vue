<template>
  <main class="min-h-screen bg-white text-slate-900">
    <section
      class="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8"
    >
      <header
        class="flex flex-col gap-5 border-b border-slate-200 pb-5 lg:flex-row lg:items-end lg:justify-between"
      >
        <div class="space-y-3">
          <router-link to="/products"
            type="button"
            class="inline-flex items-center gap-2 rounded-lg px-1 py-1 text-sm font-medium text-slate-600 transition hover:text-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100"
          >
            <span aria-hidden="true" class="text-lg leading-none">&larr;</span>
            Back to Products
          </router-link>

          <div>
            <h1 class="mt-1 text-3xl font-bold text-slate-950 sm:text-4xl">
              Create New Product
            </h1>
            <p class="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Add a new item to your enterprise inventory system.
            </p>
          </div>
        </div>

        <div class="flex flex-col-reverse gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              class="inline-flex h-11 items-center justify-center rounded-lg border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-200"
              >
              Save as Draft
            </button>
            <router-link to="/products">
              <button
                type="submit"
                form="create-product-form"
                class="inline-flex h-11 items-center justify-center rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
              >
                Create Product
              </button>
            </router-link>
        </div>
      </header>

      <form
        id="create-product-form"
        class="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px]"
        @submit.prevent="createProduct"
      >
        <div class="space-y-6">
          <section
            class="rounded-lg border border-slate-200 bg-white shadow-sm"
          >
            <div
              class="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <div class="icon">
                  <i class="fa-solid fa-circle-exclamation"></i>
                </div>
                <h2 class="mt-1 text-xl font-semibold text-slate-950">
                  General Information
                </h2>
              </div>
            </div>

            <div class="space-y-5 p-5">
              <div>
                <label class="mb-2  block text-sm font-semibold text-slate-700">
                  Product Name
                </label>
                <input
                  v-model="product.name"
                  type="text"
                  placeholder="e.g. Wireless Noise-Cancelling Headphones"
                  class="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-black  focus:ring-blue-100"
                />
              </div>
              <div>
                <label class="mb-2 block text-sm font-semibold text-slate-700">
                  Category
                </label>
                <div class="relative">
                  <select
                    v-model="product.category_id"
                    class="w-full appearance-none rounded-lg border border-slate-300 bg-white px-4 py-3 pr-10 text-sm text-slate-900 outline-none transition focus:border-black  focus:ring-blue-100"
                  >
                    <option value="" disabled>Select a category</option>
                    <option v-for="category in categories" :key="category.id" :value="category.id">
                      {{ category.name }}
                    </option>
                  </select>
                  <div class="icon_drop">
                    <i class="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none w-"></i>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            class="rounded-lg border border-slate-200 bg-white shadow-sm"
          >
            <div
              class="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <div class="icon">
                  <i class="fa-solid fa-money-check-dollar"></i>
                </div>
                <h2 class="mt-1 text-xl font-semibold text-slate-950">
                  Pricing &amp; Inventory
                </h2>
              </div>
            </div>

            <div class="grid gap-5 p-5 md:grid-cols-2">
              <div>
                <label class="mb-2 block text-sm font-semibold text-slate-700">
                  Price ($)
                </label>
                <input
                  v-model.number="product.price"
                  type="number"
                  inputmode="decimal"
                  placeholder="$ 0.00"
                  class="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-black  focus:ring-blue-100"
                />
              </div>

              <div>
                <label class="mb-2 block text-sm font-semibold text-slate-700">
                  Stock Quantity
                </label>
                <input
                  v-model.number="product.stock_quantity"
                  type="number"
                  inputmode="numeric"
                  placeholder="0"
                  class="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-black  focus:ring-blue-100"
                />
              </div>
            </div>
          </section>
        </div>

        <aside class="space-y-6 lg:sticky lg:top-6 lg:self-start">
          <section class="rounded-lg border border-slate-200 bg-white shadow-sm">
            <div class="border-b border-slate-100 p-5">
              <div class="icon"><i class="fa-solid fa-image"></i></div>
              <h2 class="mt-1 text-xl font-semibold text-slate-950">
                Product Media
              </h2>
            </div>

            <div class="space-y-4 p-5">
              <div action="">
                <label
                  class="group flex h-64 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 px-5 text-center transition hover:border-blue-400 hover:bg-blue-50/60 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100"
                >
                  <input
                    type="file"
                    accept="image/png,image/jpeg"
                    class="sr-only"
                    @change="handleImageUpload"
                  />
                  <span
                    class="flex h-14 w-14 items-center justify-center rounded-lg bg-white text-3xl font-light text-blue-600 shadow-sm ring-1 ring-slate-200 transition group-hover:ring-blue-200"
                  >
                    +
                  </span>
                  <span class="mt-4 text-sm font-semibold text-slate-800">
                    Upload primary image
                  </span>
                  <span class="mt-1 text-sm leading-6 text-slate-500">
                    Drag and drop or click to browse. Supports PNG, JPG (Max
                    5MB)
                  </span>
                </label>
              </div>
            </div>
          </section>
        </aside>
      </form>
    </section>
  </main>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "../../../services/api";

const router = useRouter();

const categories = ref([]);

const product = ref({
  name: "",
  category_id: "",
  price: "",
  stock_quantity: "",
});

const getCategories = async () => {
  try {
    const response = await api.get("/categories");
    categories.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const createProduct = async () => {
    try {
        const formData = new FormData();

        formData.append("name", product.value.name);
        formData.append("category_id", product.value.category_id);
        formData.append("price", product.value.price);
        formData.append("stock_quantity", product.value.stock_quantity);

        if (image.value) {
            formData.append("image", image.value);
        }

        const response = await api.post("/products", formData);
        console.log(response.data);

        alert("Product created successfully.");
        router.push("/products");

    } catch (error) {
      console.log(error.response);
      console.log(error.response?.status);
      console.log(error.response?.data);
    }
};
const image = ref(null);

const handleImageUpload = (event) => {
    image.value = event.target.files[0];
};

onMounted(() => {
  getCategories();
});
</script>

<style>
.icon {
  color: rgb(27, 71, 202);
  font-size: 25px;
}
.icon_drop{
  color: rgb(27, 71, 202);
  font-size: 15px;
}
</style>
