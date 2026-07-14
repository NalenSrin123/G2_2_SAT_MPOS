<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getProduct } from '../../../services/product';
import { useCartStore } from '../../../stores/cart.store';

const route = useRoute();
const router = useRouter();

const cart = useCartStore();

const product = ref(null);
const loading = ref(true);
const qty = ref(1);

const fetchProduct = async () => {
  try {
    loading.value = true;
    const res = await getProduct(route.params.id);
    product.value = res.data;
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const inc = () => qty.value++;
const dec = () => {
  if (qty.value > 1) qty.value--;
};
const addCart = () => {
  cart.addToCart(product.value, qty.value);
};

const buyNow = () => {
  cart.addToCart(product.value, qty.value);
  router.push('/payment');
};

onMounted(fetchProduct);
</script>

<template>
  <div
    class="min-h-screen bg-linear-to-br from-gray-100 via-white to-gray-200 py-6 sm:py-10 px-4 sm:px-6 lg:px-8 flex justify-center"
  >
    <!-- Loading -->
    <div
      v-if="loading"
      class="w-full max-w-7xl animate-pulse grid grid-cols-1 lg:grid-cols-2 gap-8"
    >
      <div class="bg-gray-300 rounded-3xl h-72 sm:h-96 lg:h-125"></div>

      <div class="space-y-5">
        <div class="h-6 w-1/3 bg-gray-300 rounded"></div>
        <div class="h-10 w-2/3 bg-gray-300 rounded"></div>
        <div class="h-5 w-32 bg-gray-300 rounded"></div>

        <div class="space-y-2">
          <div class="h-4 bg-gray-300 rounded"></div>
          <div class="h-4 bg-gray-300 rounded"></div>
          <div class="h-4 w-5/6 bg-gray-300 rounded"></div>
        </div>

        <div class="h-12 w-full bg-gray-300 rounded-xl"></div>
        <div class="h-12 w-full bg-gray-300 rounded-xl"></div>
      </div>
    </div>

    <!-- Product -->
    <div
      v-else-if="product"
      class="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start"
    >
      <!-- IMAGE -->
      <div
        class="bg-white rounded-3xl shadow-xl p-4 sm:p-6 flex justify-center items-center lg:sticky lg:top-8"
      >
        <img
          :src="product.image"
          :alt="product.name"
          class="w-full h-72 sm:h-96 lg:h-125 object-contain transition duration-300 hover:scale-105"
        />
      </div>

      <!-- DETAILS -->
      <div class="flex flex-col gap-5 lg:gap-6">
        <!-- Back -->
        <RouterLink
          to="/"
          class="group inline-flex items-center gap-2 text-emerald-600 font-medium transition-colors duration-300 hover:text-green-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>

          <span>Back to Products</span>
        </RouterLink>

        <!-- Title -->
        <h1
          class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight"
        >
          {{ product.name }}
        </h1>

        <!-- Price -->
        <div
          class="flex flex-wrap items-center gap-3 border-b border-gray-200 pb-5"
        >
          <p class="text-2xl sm:text-3xl font-bold text-emerald-600">
            ${{ product.price }}
          </p>

          <span
            class="bg-emerald-100 text-emerald-700 text-sm font-medium px-3 py-1 rounded-full"
          >
            ✔ In Stock
          </span>
        </div>

        <!-- Description -->
        <div>
          <h2 class="font-semibold text-lg mb-2">Description</h2>

          <p class="text-gray-600 leading-7">
            {{ product.description }}
          </p>
        </div>

        <!-- Quantity -->
        <div class="flex flex-wrap items-center gap-4">
          <span class="font-medium text-gray-700"> Quantity </span>

          <div
            class="flex items-center border rounded-xl overflow-hidden shadow-sm"
          >
            <button @click="dec" class="px-4 py-2 hover:bg-gray-100 transition">
              −
            </button>

            <span class="px-6 font-semibold">
              {{ qty }}
            </span>

            <button @click="inc" class="px-4 py-2 hover:bg-gray-100 transition">
              +
            </button>
          </div>
        </div>

        <!-- Buttons -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <button
            @click="addCart"
            class="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold shadow-lg transition"
          >
            Add to Cart
          </button>

          <button
            @click="buyNow"
            class="w-full border border-gray-300 hover:bg-gray-100 py-3 rounded-xl font-semibold transition"
          >
            Buy Now
          </button>
        </div>

        <div class="border-t"></div>
      </div>
    </div>

    <!-- Not Found -->
    <div v-else class="text-center py-20 text-gray-500 text-lg">
      Product not found.
    </div>
  </div>
</template>
