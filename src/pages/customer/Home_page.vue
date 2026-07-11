<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <header class="flex items-center justify-between px-4 sm:px-6 lg:px-32 py-4 md:py-5 bg-gray-100">
      <h1 class="text-2xl md:text-3xl font-bold text-emerald-700">
        LuxeDine
      </h1>
      <div class="flex gap-4">
       
        <Bell class="w-6 h-6 text-emerald-700" />
        <RouterLink to="/order-history" class=" hover:bg-gray-100 rounded-full transition active:scale-95 inline-flex items-center justify-center">
          <History class="w-6 h-6 text-emerald-700" />
        </RouterLink>
      </div>
    </header>

    <!-- Search -->
    <div class="px-4 sm:px-6 lg:px-32 mt-2">
      <div
        class="flex items-center gap-3 bg-white rounded-2xl px-4 py-4 border border-gray-300 shadow-sm focus-within:ring-2 focus-within:ring-emerald-500"
      >
        <Search class="w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search for delicacies..."
          class="bg-transparent outline-none w-full text-gray-600"
        />
      </div>
    </div>

    <!-- Categories - Horizontal Scroll (Works on Phone, iPad & Desktop) -->
    <div class="px-4 sm:px-6 lg:px-32 mt-6">
      <div class="flex gap-2 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
        <button
          v-for="category in categories"
          :key="category"
          class="px-6 py-3 rounded-full whitespace-nowrap transition text-sm font-medium shrink-0 snap-start"
          :class="
            category === activeCategory
              ? 'bg-emerald-700 text-white shadow-md'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          "
          @click="activeCategory = category"
        >
          {{ category }}
        </button>
      </div>
    </div>

    <!-- Popular Choices -->
    <section class="px-4 sm:px-6 lg:px-32 mt-8 bg-gray-100">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
        Popular Choices
      </h2>

      <!-- Featured Card -->
      <div class="relative overflow-hidden rounded-3xl h-65 sm:h-70 lg:h-80">
        <img
          src="https://images.unsplash.com/photo-1544025162-d76694265947"
          alt="Wagyu Ribeye Steak"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>

        <div class="absolute bottom-6 left-6 right-6">
          <span class="bg-emerald-400 text-black px-4 py-1 rounded-full text-sm font-medium">
            Bestseller
          </span>
          <h3 class="text-white text-3xl md:text-4xl font-bold mt-3">
            Wagyu Ribeye Steak
          </h3>
          <p class="text-gray-200 text-lg mt-1">
            Melt-in-your-mouth precision.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
  <div
    v-for="product in products"
    :key="product.id"
    @click="viewProduct(product.id)"
    class="relative overflow-hidden rounded-3xl h-50 sm:h-55 cursor-pointer"
  >
    <img
      :src="product.image"
      :alt="product.name"
      class="w-full h-full object-cover"
    />

    <div class="absolute inset-0 bg-linear-to-t from-black/80 to-transparent"></div>

    <div class="absolute bottom-4 left-4">
      <h3 class="text-white text-lg font-semibold">
        {{ product.name }}
      </h3>

      <p class="text-white/80">
        ${{ product.price }}
      </p>
    </div>
  </div>
</div>
    </section>

    <!-- Main Menu -->
    <div class="mt-12">
      <Design_Main_menu />
    </div>
  </div>
</template>
<style scoped>
/* Smooth scrollbar hiding */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

<script setup>
import Design_Main_menu from "../home/home/Design_Main_menu.vue";
import { ref , onMounted} from 'vue';
import { useRouter } from "vue-router";
import { getProducts } from "../../services/product.js";
const router = useRouter();
const products = ref([]);

const fetchProducts = async () => {
  try {
    const response = await getProducts();

    console.log(response.data);

    products.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const viewProduct = (id) => {
  router.push(`/products/${id}`);
};

onMounted(fetchProducts);



const categories = [
  "All", "Starters", "Main Course", "Drinks", "Desserts",
  "Seafood", "Steak", "Pasta", "Pizza", "Burgers", "Asian", "Healthy"
];

const activeCategory = ref("All");
</script>