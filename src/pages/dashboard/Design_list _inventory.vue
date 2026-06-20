<script setup>
import { ref } from 'vue'
import * as XLSX from 'xlsx'

const tableHeadClass =
  'px-6 py-4 text-left text-sm font-semibold text-gray-600'

const tableCellClass =
  'px-6 py-4 text-sm text-gray-700 align-middle'

// Inventory Items
const items = ref([
  {
    name: 'Precision Laser Scanner X-10',
    sku: 'NX-4902-1',
    category: 'HARDWARE',
    stock: 14,
    unit: 'Units',
    restocked: 'Oct 24, 2023',
    status: 'Low Stock',
    statusClass:
      'border border-red-200 bg-red-50 text-red-600',
  },
  {
    name: 'Nexus Connector Cable 3m',
    sku: 'NX-1283-A',
    category: 'ACCESSORIES',
    stock: 542,
    unit: 'Meters',
    restocked: 'Nov 02, 2023',
    status: 'Optimal',
    statusClass:
      'bg-green-100 text-green-700',
  },
  {
    name: 'POS Terminal Mount V3',
    sku: 'NX-9981-M',
    category: 'FURNITURE',
    stock: 3,
    unit: 'Units',
    restocked: 'Sep 15, 2023',
    status: 'Critical',
    statusClass:
      'border border-red-200 bg-red-50 text-red-600',
  },
])

// Dashboard Stats
const stats = ref([
  {
    label: 'TOTAL SKU VALUE',
    value: '$1,482,920.00',
    note: '+4.2% from last month',
    noteClass: 'text-green-600',
  },
  {
    label: 'LOW STOCK ALERTS',
    value: '2 Items',
    note: 'Requires immediate action',
    noteClass: 'text-red-600',
  },
  {
    label: 'RECENT RESTOCKS',
    value: '242 Units',
    note: 'Last delivery: 4 hours ago',
    noteClass: 'text-gray-500',
  },
])

const isEditing = ref(false)
const tempStocks = ref({})

// Export Excel
const exportExcel = () => {
  const data = items.value.map(item => ({
    'Item Name': item.name,
    SKU: item.sku,
    Category: item.category,
    Stock: item.stock,
    Unit: item.unit,
    Restocked: item.restocked,
    Status: item.status,
  }))

  const worksheet = XLSX.utils.json_to_sheet(data)

  const workbook = XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    'Inventory'
  )

  XLSX.writeFile(workbook, 'inventory.xlsx')
}

// Start Restock
const startRestock = () => {
  tempStocks.value = {}

  items.value.forEach(item => {
    tempStocks.value[item.sku] = item.stock
  })

  isEditing.value = true
}

// Cancel
const cancelRestock = () => {
  isEditing.value = false
  tempStocks.value = {}
}

// Save
const saveRestock = () => {
  let restockedAmount = 0

  items.value.forEach(item => {
    const newStock =
      Number(tempStocks.value[item.sku]) || 0

    if (newStock !== item.stock) {
      if (newStock > item.stock) {
        restockedAmount += newStock - item.stock
      }

      item.stock = newStock

      item.restocked = new Date().toLocaleDateString(
        'en-US',
        {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        }
      )

      if (item.stock <= 3) {
        item.status = 'Critical'
        item.statusClass =
          'border border-red-200 bg-red-50 text-red-600'
      } else if (item.stock < 20) {
        item.status = 'Low Stock'
        item.statusClass =
          'border border-red-200 bg-red-50 text-red-600'
      } else {
        item.status = 'Optimal'
        item.statusClass =
          'bg-green-100 text-green-700'
      }
    }
  })

  const lowStockCount =
    items.value.filter(item => item.stock < 20).length

  stats.value[1].value = `${lowStockCount} Items`

  if (restockedAmount > 0) {
    stats.value[2].value =
      `${242 + restockedAmount} Units`

    stats.value[2].note =
      'Last delivery: Just now'
  }

  isEditing.value = false
}
</script>

<template>
  <main class="min-h-screen bg-gray-100 p-6">
    <div
      class="mb-6 flex flex-wrap items-center justify-between gap-3"
    >
      <div>
        <h1 class="text-2xl font-bold">
          Inventory Dashboard
        </h1>

        <p class="text-sm text-gray-500">
          Real-time tracking of warehouse assets.
        </p>
      </div>

      <div class="flex gap-2">
        <button
          @click="exportExcel"
          class="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Export Excel
        </button>

        <button
          v-if="!isEditing"
          @click="startRestock"
          class="rounded bg-green-600 px-4 py-2 text-white"
        >
          Restock
        </button>

        <button
          v-if="isEditing"
          @click="saveRestock"
          class="rounded bg-green-700 px-4 py-2 text-white"
        >
          Save
        </button>

        <button
          v-if="isEditing"
          @click="cancelRestock"
          class="rounded bg-red-600 px-4 py-2 text-white"
        >
          Cancel
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div
      class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3"
    >
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="rounded-lg bg-white p-5 shadow"
      >
        <p
          class="text-xs font-bold tracking-widest text-gray-400"
        >
          {{ stat.label }}
        </p>

        <h2 class="mt-2 text-2xl font-bold">
          {{ stat.value }}
        </h2>

        <p
          class="mt-2 text-sm"
          :class="stat.noteClass"
        >
          {{ stat.note }}
        </p>
      </div>
    </div>

    <!-- Inventory Table -->
    <div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
      <!-- Title -->
      <div class="border-b border-gray-200 bg-gray-50 px-6 py-4">
        <h2 class="text-lg font-semibold text-gray-800">
          Inventory List
        </h2>
        <p class="text-sm text-gray-500">
          Current stock available in warehouse.
        </p>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full table-fixed border-collapse">
          <!-- Header -->
          <thead class="bg-gray-100">
            <tr>
              <th class="w-[28%] px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Item
              </th>

              <th class="w-[14%] px-6 py-4 text-left text-sm font-semibold text-gray-600">
                SKU
              </th>

              <th class="w-[16%] px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Category
              </th>

              <th class="w-[10%] px-6 py-4 text-center text-sm font-semibold text-gray-600">
                Stock
              </th>

              <th class="w-[10%] px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Unit
              </th>

              <th class="w-[14%] px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Restocked
              </th>

              <th class="w-[8%] px-6 py-4 text-center text-sm font-semibold text-gray-600">
                Status
              </th>
            </tr>
          </thead>

          <!-- Body -->
          <tbody class="divide-y divide-gray-100 bg-white">
            <tr
              v-for="item in items"
              :key="item.sku"
              class="hover:bg-gray-50 transition"
            >
              <!-- Item -->
              <td class="px-6 py-4 align-middle font-medium text-gray-800">
                {{ item.name }}
              </td>

              <!-- SKU -->
              <td class="px-6 py-4 align-middle text-gray-600">
                {{ item.sku }}
              </td>

              <!-- Category -->
              <td class="px-6 py-4 align-middle">
                <span
                  class="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700"
                >
                  {{ item.category }}
                </span>
              </td>

              <!-- Stock -->
              <td class="px-6 py-4 text-center align-middle">
                <span
                  v-if="!isEditing"
                  class="font-semibold text-gray-800"
                >
                  {{ item.stock }}
                </span>

                <input
                  v-else
                  v-model.number="tempStocks[item.sku]"
                  type="number"
                  min="0"
                  class="mx-auto w-20 rounded-lg border border-gray-300 px-2 py-1 text-center outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </td>

              <!-- Unit -->
              <td class="px-6 py-4 align-middle text-gray-700">
                {{ item.unit }}
              </td>

              <!-- Restocked -->
              <td class="px-6 py-4 align-middle text-gray-500">
                {{ item.restocked }}
              </td>

              <!-- Status -->
              <td class="px-5 py-4 text-center align-middle">
                <span
                  class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                  :class="item.statusClass"
                >
                  {{ item.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Footer -->
      <div
        class="flex flex-col items-center justify-between gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4 text-sm text-gray-500 md:flex-row"
      >
        <span>
          Total Items:
          <strong>{{ items.length }}</strong>
        </span>

        <span>
          Last Updated:
          {{ new Date().toLocaleDateString() }}
        </span>
      </div>
    </div>
  </main>
</template>