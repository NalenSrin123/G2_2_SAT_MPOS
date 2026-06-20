<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const subtotal = ref(0);
const orderCount = ref(0);

const products = ref([
  {
    id: 1,
    name: 'Seared Atlantic Salmon',
    description:
      'Crispy skin salmon, citrus quinoa, asparagus, and saffron cream sauce.',
    price: 28,
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300',
  },
  {
    id: 2,
    name: 'Garden Zenith Bowl',
    description:
      'Avocado, heirloom tomatoes, roasted seeds, herb-tahini dressing.',
    price: 22,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300',
  },
  {
    id: 3,
    name: 'The Luxe Burger',
    description: 'Wagyu beef, cheddar, truffle aioli, and crispy fries.',
    price: 35,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300',
  },
  {
    id: 4,
    name: 'Emerald Signature Salad',
    description: 'Roasted chickpeas, kale, feta, and pomegranate seeds.',
    price: 19,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300',
  },
  {
    id: 5,
    name: 'Berry Velveteen',
    description: 'New York cheesecake topped with fresh berry compote.',
    price: 14,
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=300',
  },
  {
    id: 6,
    name: 'Nitro Cold Brew',
    description: 'Smooth cold brew charged with nitrogen for a creamy finish.',
    price: 6.5,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300',
  },
  {
    id: 7,
    name: 'Iced Matcha Latte',
    description: 'Premium matcha blended with creamy milk and ice.',
    price: 7.5,
    image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=300',
  },
  {
    id: 8,
    name: 'Chicken Alfredo',
    description: 'Creamy parmesan sauce tossed with grilled chicken.',
    price: 24,
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=300',
  },
]);

const addToCart = (item) => {
  subtotal.value += item.price;
  orderCount.value++;
};
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
                  @click="addToCart(item)"
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
      class="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl bg-emerald-800/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-emerald-700 px-6 py-4 z-50"
    >
      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        <!-- Left -->
        <div class="flex items-center gap-4">
          <button
            class="relative bg-emerald-500 hover:bg-emerald-400 text-emerald-900 px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition"
          >
            <span
              v-if="orderCount"
              class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
            >
              {{ orderCount }}
            </span>

            <i class="fa-solid fa-cart-shopping"></i>
            <span><router-link to="/">View Order</router-link></span>
          </button>

          <button
            class="hidden sm:flex items-center gap-1 text-white font-medium hover: hover:scale-105 transition"
          >
            <i class="fa-solid fa-credit-card"></i>
            Payment
          </button>

          <button
            class="hidden sm:flex items-center gap-1 text-white font-medium hover: hover:scale-105 transition"
          >
            <i class="fa-solid fa-truck-fast"></i>
            Shipping
          </button>
        </div>

        <!-- Right -->
        <div class="text-center md:text-right">
          <p class="uppercase tracking-widest text-xs text-emerald-200">
            Subtotal
          </p>

          <h2 class="text-white text-3xl md:text-4xl font-extrabold">
            ${{ subtotal.toFixed(2) }}
          </h2>

          <p v-if="orderCount === 0" class="text-emerald-200 text-xs mt-1">
            No items added yet
          </p>

          <p v-else class="text-emerald-200 text-xs mt-1">
            {{ orderCount }} item(s) selected
          </p>
        </div>
      </div>
    </div>
  </main>
</template>
