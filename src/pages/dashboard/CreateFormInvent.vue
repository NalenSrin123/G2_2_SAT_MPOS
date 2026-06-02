<template>
  <div class="min-h-screen bg-slate-100 p-6">
    <div class="max-w-7xl mx-auto">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-3xl font-bold text-slate-800">
            Create Inventory Record
          </h1>
          <p class="text-sm text-slate-500">
            Register new stock intake or update existing product quantities.
          </p>
        </div>
        <div class="flex gap-3">
          <button class="px-5 py-2 border rounded-lg bg-white hover:bg-gray-50 cursor-pointer">
            Discard
          </button>
          <button class="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">
            Confirm Intake
          </button>
        </div>
      </div>
      <div class="grid lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 space-y-6">
          <!-- Product Selection -->
          <div class="bg-white rounded-2xl p-6 shadow-sm">
            <h2 class="font-semibold text-lg mb-4">
              Product Selection
            </h2>
            <div class="mb-4">
              <label class="text-sm text-gray-600">
                Search Existing Product
              </label>
              <input
                type="text"
                placeholder="Select by name or scan barcode..."
                class="w-full mt-2 border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="text-sm text-gray-600">
                  SKU / Item Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. ELE-492-BK"
                  class="w-full mt-2 border rounded-lg px-4 py-3"
                />
              </div>
              <div>
                <label class="text-sm text-gray-600">
                  Supplier
                </label>
                <select class="w-full mt-2 border rounded-lg px-4 py-3">
                  <option>Select Vendor</option>
                  <option>Samsung</option>
                  <option>Apple</option>
                  <option>Asus</option>
                </select>
              </div>
            </div>
          </div>
          <div class="grid md:grid-cols-2 gap-6">
            <!-- Stock Levels -->
            <div class="bg-white rounded-2xl p-6 shadow-sm">
              <h2 class="font-semibold text-lg mb-5">
                Stock Levels
              </h2>
              <label class="text-sm text-gray-600">
                Initial Stock Intake
              </label>
              <div class="flex gap-4 mt-2">
                <div class="flex flex-1 h-14 border rounded-xl overflow-hidden">
                  <button @click="decrease" class="w-14 text-2xl hover:bg-gray-100">
                    -
                  </button>

                  <input
                    v-model="quantity"
                    type="number"
                    class="flex-1 text-center outline-none"
                  />
                  <button @click="increase" class="w-14 text-2xl hover:bg-gray-100">
                    +
                  </button>
                </div>
                <div class="px-5 border rounded-xl flex items-center justify-center font-semibold cursor-default">
                  UNITS
                </div>
              </div>
              <div class="mt-6">
                <label class="text-sm text-gray-600">
                  Minimum Threshold (Alerts)
                </label>
                <div
                  class="h-2 bg-gray-200 rounded-full mt-3"
                ></div>
                <div class="flex justify-between mt-3 text-sm">
                  <span class="text-red-500">
                    Critical: 5
                  </span>
                  <span class="text-blue-600 font-semibold">
                    Alert at: 15 units
                  </span>
                  <span class="text-green-600">
                    Sufficient: 50+
                  </span>
                </div>
              </div>
            </div>

            <!-- Warehouse Placement -->
            <div class="bg-white rounded-2xl p-6 shadow-sm">
              <h2 class="font-semibold text-lg mb-5">
                Warehouse Placement
              </h2>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="text-sm text-gray-600">
                    Storage Facility
                  </label>
                  <select class="w-full mt-2 border rounded-lg px-4 py-3">
                    <option>Central Hub A1</option>
                    <option>Warehouse B</option>
                  </select>
                </div>
                <div>
                  <label class="text-sm text-gray-600">
                    Zone / Aisle
                  </label>
                  <input
                    type="text"
                    placeholder="Aisle 12"
                    class="w-full mt-2 border rounded-lg px-4 py-3"
                  />
                </div>
              </div>
              <div class="mt-4">
                <label class="text-sm text-gray-600">
                  Placement Notes
                </label>
                <textarea
                  rows="4"
                  placeholder="Fragile handling required..."
                  class="w-full mt-2 border rounded-lg px-4 py-3"
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Documentation & Verification -->
          <div class="bg-white rounded-2xl p-6 shadow-sm">
            <h2 class="font-semibold text-lg mb-4">
              Documentation & Verification
            </h2>
            <div class="border-2 border-dashed rounded-xl p-12 text-center">
              <div class="text-4xl mb-3">📁</div>
              <h3 class="font-semibold">
                Upload Invoices or Packing Slips
              </h3>
              <p class="text-sm text-gray-500 mt-2">
                Drag & Drop PDF, PNG, JPG files up to 10MB
              </p>
            </div>
          </div>
        </div>

        <!-- Inventory Status -->
        <div>
          <div class="bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <h2 class="font-semibold text-blue-700 mb-4">
              Inventory Status
            </h2>
            <p class="text-sm text-gray-600">
              You are adding units to the Global Distribution hub.
            </p>
            <div class="mt-6 space-y-4">
              <div class="flex justify-between">
                <span class="text-gray-500">
                  Last Restock
                </span>
                <span class="font-medium">
                  Jun 02, 2026
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">
                  Avg. Turnover
                </span>
                <span class="font-medium">
                  14.2 Days
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">
                  Stock Forecast
                </span>
                <span class="font-semibold text-blue-600">
                  +240 Units
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Inventory Created -->
      <div class="fixed bottom-5 right-5 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-lg cursor-pointer">
        Inventory Created
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const quantity = ref(100);

const increase = () => {
  quantity.value++;
};

const decrease = () => {
  if (quantity.value > 0) {
    quantity.value--;
  }
};
</script>