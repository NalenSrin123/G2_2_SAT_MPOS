<script setup>
import { ref } from 'vue'
import * as XLSX from 'xlsx'

const tableHeadClass =
  'border-b px-4 py-3 text-left text-xs font-semibold text-gray-500'

const tableCellClass =
  'border-b px-4 py-3 text-sm text-gray-700'

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

    <!-- Table -->
    <div
      class="overflow-x-auto rounded-lg bg-white shadow"
    >
      <table class="w-full">
        <thead>
          <tr>
            <th :class="tableHeadClass">Item</th>
            <th :class="tableHeadClass">SKU</th>
            <th :class="tableHeadClass">Category</th>
            <th :class="tableHeadClass">Stock</th>
            <th :class="tableHeadClass">Unit</th>
            <th :class="tableHeadClass">Restocked</th>
            <th :class="tableHeadClass">Status</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="item in items"
            :key="item.sku"
          >
            <td :class="tableCellClass">
              {{ item.name }}
            </td>

            <td :class="tableCellClass">
              {{ item.sku }}
            </td>

            <td :class="tableCellClass">
              {{ item.category }}
            </td>

            <td :class="tableCellClass">
              <span v-if="!isEditing">
                {{ item.stock }}
              </span>

              <input
                v-else
                v-model.number="
                  tempStocks[item.sku]
                "
                type="number"
                min="0"
                class="w-20 rounded border p-1"
              />
            </td>

            <td :class="tableCellClass">
              {{ item.unit }}
            </td>

            <td :class="tableCellClass">
              {{ item.restocked }}
            </td>

            <td :class="tableCellClass">
              <span
                class="rounded px-2 py-1 text-xs font-bold"
                :class="item.statusClass"
              >
                {{ item.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>