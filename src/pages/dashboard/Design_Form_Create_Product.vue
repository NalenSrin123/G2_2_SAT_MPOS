<template>
  <main class="min-h-screen bg-white text-slate-900">
    <section
      class="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8"
    >
      <header
        class="flex flex-col gap-5 border-b border-slate-200 pb-5 lg:flex-row lg:items-end lg:justify-between"
      >
        <div class="space-y-3">
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-lg px-1 py-1 text-sm font-medium text-slate-600 transition hover:text-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100"
          >
            <span aria-hidden="true" class="text-lg leading-none">&larr;</span>
            Back to Products
          </button>

          <div>
            <h1 class="mt-1 text-3xl font-bold text-slate-950 sm:text-4xl">
              Create New Product
            </h1>
            <p
              class="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base"
            >
              Add a new item to your enterprise inventory system.
            </p>
          </div>
        </div>

        <div class="flex flex-col-reverse gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            class="inline-flex h-11 items-center justify-center rounded-lg border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-200"
          >
            Discard
          </button>

          <button
            type="submit"
            form="create-product-form"
            class="inline-flex h-11 items-center justify-center rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
            :disabled="loading"
          >
            <span v-if="loading" class="mr-2">
              <i class="fa-solid fa-spinner fa-spin"></i>
            </span>
            {{ loading ? "Creating..." : "Create Product" }}
          </button>
        </div>
      </header>

      <!-- Success Message -->
      <div v-if="successMessage" class="rounded-md bg-green-50 p-4">
        <p class="text-sm font-medium text-green-800">{{ successMessage }}</p>
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="rounded-md bg-red-50 p-4">
        <p class="text-sm font-medium text-red-800">{{ errorMessage }}</p>
      </div>

      <form
        id="create-product-form"
        class="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px]"
        @submit.prevent="submitProduct"
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
                <label class="mb-2 block text-sm font-semibold text-slate-700">
                  Product Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Wireless Noise-Cancelling Headphones"
                  class="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  v-model="form.name"
                  required
                />
              </div>

              <div class="grid gap-4 md:grid-cols-2">
                <div>
                  <label
                    class="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    SKU
                  </label>
                  <input
                    type="text"
                    placeholder="NX-PR-001"
                    class="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    required
                  />
                </div>

                <div>
                  <label
                    class="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Category
                  </label>
                  <div class="relative">
                    <select
                      class="w-full appearance-none rounded-lg border border-slate-300 bg-white px-4 py-3 pr-10 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      v-model="form.category_id"
                      required
                    >
                      <option value="" disabled>Select Category</option>
                      <option
                        v-for="cat in categories"
                        :key="cat.id"
                        :value="cat.id"
                      >
                        {{ cat.name }}
                      </option>
                    </select>
                    <i class="fa-solid fa-chevron-down pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-blue-600"></i>
                  </div>
                </div>
              </div>

              <div>
                <label class="mb-2 block text-sm font-semibold text-slate-700">
                  Description
                </label>
                <textarea
                  rows="5"
                  placeholder="Detailed product specifications and features..."
                  class="min-h-32 w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                ></textarea>
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
                  Selling Price ($)
                </label>
                <input
                  type="number"
                  inputmode="decimal"
                  placeholder="$ 0.00"
                  class="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  v-model="form.price"
                  required
                />
              </div>

              <div>
                <label class="mb-2 block text-sm font-semibold text-slate-700">
                  Cost Price ($)
                </label>
                <input
                  type="number"
                  inputmode="decimal"
                  placeholder="$ 0.00"
                  class="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label class="mb-2 block text-sm font-semibold text-slate-700">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  inputmode="numeric"
                  placeholder="0"
                  class="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label class="mb-2 block text-sm font-semibold text-slate-700">
                  Weight / Unit
                </label>
                <div class="flex rounded-lg shadow-sm">
                  <input
                    type="text"
                    placeholder="e.g. 0.5"
                    class="min-w-0 flex-1 rounded-l-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:z-10 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                  <span
                    class="inline-flex items-center rounded-r-lg border border-l-0 border-slate-300 bg-slate-50 px-4 text-sm font-semibold text-slate-600"
                  >
                    kg
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>

        <aside class="space-y-6 lg:sticky lg:top-6 lg:self-start">
          <section
            class="rounded-lg border border-slate-200 bg-white shadow-sm"
          >
            <div class="border-b border-slate-100 p-5">
              <div class="icon"><i class="fa-solid fa-image"></i></div>
              <h2 class="mt-1 text-xl font-semibold text-slate-950">
                Product Media
              </h2>
            </div>

            <div class="space-y-4 p-5">
              <label
                class="group flex h-64 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 px-5 text-center transition hover:border-blue-400 hover:bg-blue-50/60 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100"
              >
                <input
                  id="product-image-input"
                  type="file"
                  accept="image/png,image/jpeg"
                  class="sr-only"
                  @change="handleImage"
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
                  Drag and drop or click to browse. Supports PNG, JPG (Max 5MB)
                </span>
              </label>

              <div class="grid grid-cols-4 gap-3">
                <button
                  v-for="i in 4"
                  :key="i"
                  type="button"
                  class="flex aspect-square items-center justify-center rounded-lg border border-slate-200 bg-slate-50 transition hover:border-blue-300 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100"
                  :aria-label="`Product image slot ${i}`"
                >
                  <span class="h-5 w-6 rounded">
                    <div class="mt-0 flex justify-center mt-0.5">
                      <i
                        class="fa-regular fa-clone"
                        style="color: royalblue"
                      ></i>
                    </div>
                  </span>
                </button>
              </div>
            </div>
          </section>

          <section
            class="rounded-lg border border-slate-200 bg-white shadow-sm"
          >
            <div class="border-b border-slate-100 p-5">
              <h2 class="text-xl font-semibold text-slate-950">
                Product Status
              </h2>
            </div>

            <div class="p-5">
              <div
                class="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3"
              >
                <div>
                  <p class="font-semibold text-slate-700">Published</p>
                  <p class="text-xs text-slate-500">
                    Make product visible to customers
                  </p>
                </div>

                <label class="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" v-model="form.status" class="peer sr-only" />
                  <span class="relative h-6 w-11 rounded-full bg-slate-300 transition peer-checked:bg-blue-600 after:absolute after:left-[3px] after:top-[3px] after:h-[18px] after:w-[18px] after:rounded-full after:bg-white after:transition peer-checked:after:translate-x-5"></span>
                </label>
              </div>
            </div>
          </section>

          <section class="rounded-lg border border-slate-200 bg-white shadow-sm">
            <div class="border-b border-slate-100 p-5">
              <h2 class="text-xl font-semibold text-slate-950">
                Organization
              </h2>
            </div>

            <div class="space-y-5 p-5">
              <div>
                <label class="mb-2 block text-sm font-semibold text-slate-700">
                  Supplier
                </label>
                <input
                  type="text"
                  placeholder="Search suppliers..."
                  class="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label class="mb-2 block text-sm font-semibold text-slate-700">
                  Tags
                </label>
                <input
                  type="text"
                  placeholder="Add tags (separated by commas)"
                  class="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div
                class="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3"
              >
                <span class="text-sm font-semibold text-slate-700">
                  Track Stock Levels
                </span>

                <label class="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" class="peer sr-only" />
                  <span
                    class="relative h-6 w-11 rounded-full bg-slate-300 transition peer-checked:bg-blue-600 peer-focus-visible:ring-4 peer-focus-visible:ring-blue-100 after:absolute after:left-[3px] after:top-[3px] after:h-[18px] after:w-[18px] after:rounded-full after:bg-white after:shadow after:transition peer-checked:after:translate-x-5"
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
<script setup>
import { ref, onMounted } from 'vue'
import api from '../../services/api'

// =====================
// STATE
// Holds all form data, reactive to user input.
// =====================
const form = ref({
  category_id: "",
  name: "",
  price: "",
  image: null,   // file upload
  status: true,  // default active
})

const categories = ref([]) // To store category list from API

// =====================
// UI STATE
// =====================
const loading = ref(false)
const successMessage = ref("");
const errorMessage = ref("");

// =====================
// FETCH CATEGORIES (GET)
// =====================
const fetchCategories = async () => {
  try {
    const { data } = await api.get('/product')
    categories.value = data
  } catch (err) {
    console.error(err)
    errorMessage.value = "Could not load categories. Please try again later."
  }
}

// =====================
// HANDLE IMAGE
// Stores the selected file in the `image` ref.
// =====================
const handleImage = (e) => {
  const file = e.target.files[0]
  if (file) {
    form.value.image = file
  }
}

// =====================
// SUBMIT PRODUCT (POST)
// Handles form validation, data submission, and UI feedback.
// =====================
const submitProduct = async () => {
  // 1. Validate required fields
  if (!form.value.name || !form.value.category_id || !form.value.price) {
    errorMessage.value =
      "Please fill in all required fields: Product Name, Category, and Selling Price."
    return
  }

  // 2. Set loading state and clear previous messages
  loading.value = true
  successMessage.value = ""
  errorMessage.value = ""

  try {
    // 3. Create FormData to handle file upload
    const formData = new FormData()

    formData.append('category_id', form.value.category_id);
    formData.append('name', form.value.name);
    formData.append('price', form.value.price);
    formData.append('status', form.value.status ? '1' : '0');

    // 4. Append image if it exists
    if (form.value.image) {
      formData.append("image", form.value.image)
    }

    // 5. Submit data using the shared Axios client
    await api.post('/products', formData)

    // 6. Show success message
    successMessage.value = "Product created successfully!"

    // 7. Reset form after success
    form.value = {
      category_id: "",
      name: "",
      price: "",
      image: null,
      status: true,
    }

    // Clear the file input visually
    const fileInput = document.getElementById("product-image-input")
    if (fileInput) fileInput.value = ""
  } catch (err) {
    // 8. Show error message if request fails
    errorMessage.value = err.message
  } finally {
    // 9. Reset loading state
    loading.value = false
  }
}

// =====================
// LIFECYCLE HOOK
// Fetch initial data when the component is mounted.
// =====================
onMounted(() => {
  fetchCategories()
})
</script>

<style>
.icon {
  color: rgb(27, 71, 202);
  font-size: 25px;
}
</style>
