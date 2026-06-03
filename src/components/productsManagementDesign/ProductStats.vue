<template>
  <!-- Product Stats Container -->
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-4 px-4">

    <!-- Card total product -->
    <div
      class="bg-white rounded-lg p-3 md:p-4 border border-gray-300 hover:bg-gray-100 flex flex-col justify-between min-h-32.5 md:min-h-40"
    >
      <div class="flex justify-between items-start">
        <h3 class="uppercase text-gray-500 text-[10px] sm:text-xs md:text-sm font-bold">
          Total Products
        </h3>

        <div class="bg-gray-200 rounded-full p-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 h-4 md:w-5 md:h-5 text-blue-700"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
            />
          </svg>
        </div>
      </div>

      <div>
        <h2 class="text-lg sm:text-xl md:text-3xl font-bold">
          {{totalProducts.toLocaleString()}}
        </h2>

        <span class="text-blue-500 text-[10px] sm:text-xs md:text-sm">
          Products available
        </span>
      </div>
    </div>

    <!-- Card low stock -->
    <div
      class="bg-white rounded-lg p-3 md:p-4 border border-gray-300 hover:bg-gray-100 flex flex-col justify-between min-h-32.5 md:min-h-40"
    >
      <div class="flex justify-between items-start">
        <h3 class="uppercase text-gray-500 text-[10px] sm:text-xs md:text-sm font-bold">
          Low Stock
        </h3>

        <div class="bg-gray-200 rounded-full p-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 h-4 md:w-5 md:h-5 text-red-500"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
        </div>
      </div>
      <div>
        <h2 class="text-lg sm:text-xl md:text-3xl font-bold text-red-600">
          {{lowStockProducts.toLocaleString()}} out of {{ totalProducts.toLocaleString() }}
        </h2>
        <span class="text-red-500 text-[10px] sm:text-xs md:text-sm">
          Need restock
        </span>
      </div>
    </div>

    <!-- Card top category -->
    <div
      class="bg-white rounded-lg p-3 md:p-4 border border-gray-300 hover:bg-gray-100 flex flex-col justify-between min-h-32.5 md:min-h-40"
    >
      <div class="flex justify-between items-start">
        <h3 class="uppercase text-gray-500 text-[10px] sm:text-xs md:text-sm font-bold">
          Top Category
        </h3>
        <div class="bg-gray-200 rounded-full p-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 h-4 md:w-5 md:h-5 text-blue-600"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
            />
          </svg>
        </div>
      </div>
      <div>
        <h2 class="text-sm sm:text-lg md:text-3xl font-bold wrap-break-word">
          {{topCategory}}
        </h2>
        <span class="text-blue-500 text-[10px] sm:text-xs md:text-sm">
          Most products in this category
        </span>
      </div>
    </div>
    <!-- Card average price -->
    <div
      class="bg-white rounded-lg p-3 md:p-4 border border-gray-300 hover:bg-gray-100 flex flex-col justify-between min-h-32.5 md:min-h-40"
    >
      <div class="flex justify-between items-start">
        <h3 class="uppercase text-gray-500 text-[10px] sm:text-xs md:text-sm font-bold">
          Average Price
        </h3>
        <div class="bg-gray-200 rounded-full p-1.5">
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 md:w-5 md:h-5 text-green-600">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
        </svg>
        </div>
      </div>
      <div>
        <h2 class="text-lg sm:text-xl md:text-3xl font-bold">
         ${{ averagePrice.toLocaleString() }}
        </h2>
        <span class="text-green-500 text-[10px] sm:text-xs md:text-sm">
          Average Product Price
        </span>
      </div>
    </div>

  </div>
</template>

<script setup>
defineProps({
  totalProducts: {
    type: Number,
    default: 0
  },

  lowStockProducts: {
    type: Number,
    default: 0
  },

  topCategory: {
    type: String,
    default: '-'
  },

  averagePrice: {
    type: [String, Number],
    default: 0
  }
})
</script>