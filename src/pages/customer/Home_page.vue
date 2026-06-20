<template>
  <div class="min-h-screen bg-gray-50">

    <!-- Header -->
    <header class="flex items-center justify-between px-6 py-5 bg-white">
      <h1 class="text-3xl font-bold text-emerald-700">
        LuxeDine
      </h1>
      <div class="flex gap-4">
        <Search class="w-6 h-6 text-emerald-700" />
        <Bell class="w-6 h-6 text-emerald-700" />
        <RouterLink to="/order-history" class=" hover:bg-gray-100 rounded-full transition active:scale-95 inline-flex items-center justify-center">
          <History class="w-6 h-6 text-emerald-700" />
        </RouterLink>
      </div>
    </header>

    <!-- Search -->
    <div class="px-6 mt-2">
      <div
        class="flex items-center gap-3 bg-gray-100 rounded-2xl px-4 py-4"
      >
        <Search class="w-5 h-5 text-gray-500" />

        <input
          type="text"
          placeholder="Search for delicacies..."
          class="bg-transparent outline-none w-full text-gray-600"
        />
      </div>
    </div>

    <!-- Categories -->
<div
  class="flex gap-3 overflow-x-auto px-6 mt-6 pb-2 scrollbar-hide"
>
  <button
    v-for="category in categories"
    :key="category"
    class="px-6 py-3 rounded-full whitespace-nowrap transition"
    :class="
      category === activeCategory
        ? 'bg-emerald-700 text-white'
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    "
  >
    {{ category }}
  </button>
</div>

    <!-- Popular Choices -->
    <section class="px-6 mt-8">
      <h2 class="text-4xl font-bold text-gray-900 mb-5">
        Popular Choices
      </h2>

      <!-- Featured Card -->
      <div
        class="relative overflow-hidden rounded-3xl h-[280px]"
      >
        <img
          src="https://images.unsplash.com/photo-1544025162-d76694265947"
          alt=""
          class="w-full h-full object-cover"
        />

        <div
          class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
        ></div>

        <div class="absolute bottom-5 left-5">
          <span
            class="bg-emerald-400 text-black px-4 py-1 rounded-full text-sm font-medium"
          >
            Bestseller
          </span>

          <h3
            class="text-white text-4xl font-bold mt-3"
          >
            Wagyu Ribeye Steak
          </h3>

          <p class="text-gray-200 text-lg">
            Melt-in-your-mouth precision.
          </p>
        </div>
      </div>

      <!-- Grid Items -->
      <!-- Grid Items -->
<div class="grid grid-cols-2 gap-4 mt-5">

  <!-- Card 1 -->
  <div class="relative overflow-hidden rounded-3xl h-[220px]">
    <img
      src="https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9"
      class="w-full h-full object-cover"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

    <div class="absolute bottom-4 left-4">
      <h3 class="text-white text-xl font-semibold">
        Truffle Fettuccine
      </h3>

      <p class="text-white/80">
        $32.00
      </p>
    </div>
  </div>

  <!-- Card 2 -->
  <div class="relative overflow-hidden rounded-3xl h-[220px]">
    <img
      src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b"
      class="w-full h-full object-cover"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

    <div class="absolute bottom-4 left-4">
      <h3 class="text-white text-xl font-semibold">
        Midnight Orchid
      </h3>

      <p class="text-white/80">
        $18.00
      </p>
    </div>
  </div>

  <!-- Card 3 -->
  <div class="relative overflow-hidden rounded-3xl h-[220px]">
    <img
      src="https://italianstreetkitchen.com/au/wp-content/uploads/2021/10/Gamberi-Prawn-Pizza.jpg"
      class="w-full h-full object-cover"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

    <div class="absolute bottom-4 left-4">
      <h3 class="text-white text-xl font-semibold">
        Italian Pizza
      </h3>

      <p class="text-white/80">
        $24.00
      </p>
    </div>
  </div>

  <!-- Card 4 -->
  <div class="relative overflow-hidden rounded-3xl h-[220px]">
    <img
      src="https://images.unsplash.com/photo-1550547660-d9450f859349"
      class="w-full h-full object-cover"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

    <div class="absolute bottom-4 left-4">
      <h3 class="text-white text-xl font-semibold">
        Classic Burger
      </h3>

      <p class="text-white/80">
        $15.00
      </p>
    </div>
  </div>

</div>
    </section>

  </div>
</template>

<script setup>
import {
  Search,
  Bell,
  History,
} from "lucide-vue-next";

const categories = [
  "All",
  "Starters",
  "Main Course",
  "Drinks",
  "Desserts",
  "Seafood",
  "Steak",
  "Pasta",
  "Pizza",
  "Burgers",
  "Asian",
  "Healthy",
];

const activeCategory = "All";
</script>