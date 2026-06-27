<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <header class="flex items-center justify-between px-4 sm:px-6 lg:px-32 py-4 md:py-5 bg-gray-100">
      <h1 class="text-2xl md:text-3xl font-bold text-emerald-700">
        LuxeDine
      </h1>

      <div class="flex gap-4">
       
        <Bell class="w-6 h-6 text-emerald-700" />
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
          class="px-6 py-3 rounded-full whitespace-nowrap transition text-sm font-medium flex-shrink-0 snap-start"
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
      <div class="relative overflow-hidden rounded-3xl h-[260px] sm:h-[280px] lg:h-[320px]">
        <img
          src="https://images.unsplash.com/photo-1544025162-d76694265947"
          alt="Wagyu Ribeye Steak"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

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

      <!-- Grid Items -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        <!-- Card 1 -->
        <div class="relative overflow-hidden rounded-3xl h-[200px] sm:h-[220px]">
          <img
            src="https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div class="absolute bottom-4 left-4">
            <h3 class="text-white text-lg font-semibold">Truffle Fettuccine</h3>
            <p class="text-white/80">$32.00</p>
          </div>
        </div>

        <!-- Card 2 -->
        <div class="relative overflow-hidden rounded-3xl h-[200px] sm:h-[220px]">
          <img
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div class="absolute bottom-4 left-4">
            <h3 class="text-white text-lg font-semibold">Midnight Orchid</h3>
            <p class="text-white/80">$18.00</p>
          </div>
        </div>

        <!-- Card 3 -->
        <div class="relative overflow-hidden rounded-3xl h-[200px] sm:h-[220px]">
          <img
            src="https://italianstreetkitchen.com/au/wp-content/uploads/2021/10/Gamberi-Prawn-Pizza.jpg"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div class="absolute bottom-4 left-4">
            <h3 class="text-white text-lg font-semibold">Italian Pizza</h3>
            <p class="text-white/80">$24.00</p>
          </div>
        </div>

        <!-- Card 4 -->
        <div class="relative overflow-hidden rounded-3xl h-[200px] sm:h-[220px] 
             md:hidden lg:block">   <!-- Add this -->
          <img
            src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
            class="w-full h-full object-cover"
          />
          
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div class="absolute bottom-4 left-4">
            <h3 class="text-white text-lg font-semibold">Berry Cheesecake</h3>
            <p class="text-white/80">$16.00</p>
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

<script setup>
import { Search, Bell } from "lucide-vue-next";
import Design_Main_menu from "../home/home/Design_Main_menu.vue";
import { ref } from 'vue';

const categories = [
  "All", "Starters", "Main Course", "Drinks", "Desserts",
  "Seafood", "Steak", "Pasta", "Pizza", "Burgers", "Asian", "Healthy"
];

const activeCategory = ref("All");
</script>

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