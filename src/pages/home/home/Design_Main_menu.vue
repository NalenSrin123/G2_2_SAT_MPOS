<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import Home_page from '../../customer/Home_page.vue';
import { useCartStore } from '@/stores/cart.store';
import api from '@/services/api';

// const { subtotal, orderCount, addToCart } = useCartStore();
const cart = useCartStore();

const products = ref([]);
const isLoading = ref(true);

const fetchProducts = async () => {
  try {
    const response = await api.get('/products');
    products.value = response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <main class="min-h-screen bg-slate-100">
    <!-- Header -->
    <section class="max-w-7xl mx-auto px-4 pt-8 pb-6">
      <h1 class="text-4xl font-extrabold text-slate-900">Main Menu</h1>

      <p class="text-slate-500 mt-2">
        Explore our signature dishes and refreshing beverages.
      </p>
    </section>

    <!-- Content -->
    <section class="max-w-7xl mx-auto px-4 pb-40">
      <div
        class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6"
      >
        <div
          v-for="item in products"
          :key="item.id"
          class="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <div class="flex items-start gap-4">
            <!-- Product Image -->
            <img
              :src="item.image"
              :alt="item.name"
              class="w-24 h-24 rounded-2xl object-cover shadow"
            />

            <!-- Product Info -->
            <div class="flex-1">
              <h3 class="font-bold text-lg text-slate-900 leading-tight">
                {{ item.name }}
              </h3>

              <p
                class="text-sm text-slate-500 mt-2 leading-relaxed line-clamp-2"
              >
                {{ item.description }}
              </p>

              <div class="mt-4 flex items-center justify-between">
                <span class="text-2xl font-extrabold text-emerald-600">
                  ${{ item.price.toFixed(2) }}
                </span>

                <button
                  @click="cart.addToCart(item)"
                  class="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xl font-bold flex items-center justify-center shadow-lg hover:scale-110 transition-all"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

   <!-- Floating Cart -->
<div
  v-if="cart.orderCount > 0"
  class="fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-md bg-emerald-700 rounded-2xl shadow-xl px-4 py-3 z-50"
>
  <router-link
    to="/cart"
    class="flex items-center justify-between text-white"
  >
    <div class="flex items-center gap-3">
      <div
        class="w-7 h-7 rounded-full bg-white text-emerald-700 flex items-center justify-center text-sm font-bold"
      >
        {{ cart.orderCount }}
      </div>

      <span class="font-semibold">
        View Order
      </span>
    </div>

    <span class="text-xl font-bold">
      ${{ cart.subtotal.toFixed(2) }}
    </span>
  </router-link>
</div>  
  </main>
</template>
