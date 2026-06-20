<script setup>
import { ref } from 'vue'
import * as XLSX from "xlsx";

const iconStroke =
  'h-[18px] w-[18px] fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]'

const smallIconStroke =
  'h-[17px] w-[17px] fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]'

const tableHeadClass =
  'border-b border-[#f0f2f5] px-3 py-3 text-left text-[9px] font-semibold leading-tight tracking-[1.5px] text-[#777d8c] md:px-4 md:py-4 md:text-[10px] md:tracking-[3px] xl:px-5'

const tableCellClass =
  'border-b border-[#f0f2f5] px-3 py-3 align-middle text-xs text-[#3f4653] md:px-4 md:py-4 md:text-sm xl:px-5'

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
    noteClass: 'text-green-600 font-bold',
    auraClass: 'bg-[#eaf2ff]',
    iconClass: 'bg-[#ddecff] text-[#0056bc]',
    icon: 'money',
  },
  {
    label: 'LOW STOCK ALERTS',
    value: '18 Items',
    note: 'Requires immediate action',
    noteClass: 'text-[#cf1111] font-bold',
    auraClass: 'bg-[#fff0f0]',
    iconClass: 'bg-[#ffe1e1] text-[#e03131]',
    icon: 'warning',
  },
  {
    label: 'RECENT RESTOCKS',
    value: '242 Units',
    note: 'Last delivery: 4 hours ago',
    noteClass: 'text-[#7a8496] font-medium',
    auraClass: 'bg-[#e5fbff]',
    iconClass: 'bg-[#177e8c] text-white',
    icon: 'truck',
  },
])

// Export Excel
const exportExcel = () => {
  const data = items.value.map(item => ({
    'Item Name': item.name,
    'SKU': item.sku,
    'Category': item.category,
    'Current Stock': item.stock,
    'Unit': item.unit,
    'Last Restocked': item.restocked,
    'Status': item.status,
  }))

  const worksheet = XLSX.utils.json_to_sheet(data)
  const workbook = XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Inventory')

  XLSX.writeFile(workbook, 'inventory.xlsx')
}

// Edit Mode
const isEditing = ref(false)
const tempStocks = ref({})

// Start Edit
const startRestock = () => {
  items.value.forEach(item => {
    tempStocks.value[item.sku] = item.stock
  })

  isEditing.value = true
}

// Cancel Edit
const cancelRestock = () => {
  isEditing.value = false
  tempStocks.value = {}
}

// Save Edit
const saveRestock = () => {
  let rawRestockedCount = 0

  items.value.forEach(item => {
    const updatedValue =
      parseInt(tempStocks.value[item.sku]) || 0

    if (updatedValue !== item.stock) {
      if (updatedValue > item.stock) {
        rawRestockedCount += updatedValue - item.stock
      }

      item.stock = updatedValue

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
          'border border-[#ffd7d7] bg-[#fff1f1] text-[#d11111]'
      } else if (item.stock < 20) {
        item.status = 'Low Stock'
        item.statusClass =
          'border border-[#ffd7d7] bg-[#fff1f1] text-[#d11111]'
      } else {
        item.status = 'Optimal'
        item.statusClass =
          'bg-[#dff8e9] text-[#14994c]'
      }
    }
  })

  const newLowStockCount =
    items.value.filter(i => i.stock < 20).length

  stats.value[1].value = `${newLowStockCount} Items`

  if (rawRestockedCount > 0) {
    stats.value[2].value =
      `${242 + rawRestockedCount} Units`

    stats.value[2].note = 'Last delivery: Just now'
  }

  isEditing.value = false
}
</script>

<template>
  <main class="min-h-screen bg-[#f7f8fb] p-5">

    <!-- Header -->
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold">
          Inventory Management
        </h1>

        <p class="text-sm text-gray-500">
          Real-time tracking of warehouse assets.
        </p>
      </div>

      <div class="flex gap-3">

        <!-- Export -->
        <button
          @click="exportExcel"
          class="rounded bg-blue-500 px-4 py-2 text-white"
        >
          Export Excel
        </button>

        <!-- Edit -->
        <button
          v-if="!isEditing"
          @click="startRestock"
          class="rounded bg-green-600 px-4 py-2 text-white"
        >
          Restock
        </button>

        <!-- Save -->
        <button
          v-if="isEditing"
          @click="saveRestock"
          class="rounded bg-green-700 px-4 py-2 text-white"
        >
          Save
        </button>

        <!-- Cancel -->
        <button
          v-if="isEditing"
          @click="cancelRestock"
          class="rounded bg-red-500 px-4 py-2 text-white"
        >
          Cancel
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="rounded-lg bg-white p-5 shadow"
      >
        <p class="text-xs font-bold tracking-widest text-gray-400">
          {{ stat.label }}
        </p>

        <h2 class="mt-2 text-2xl font-bold">
          {{ stat.value }}
        </h2>

        <p class="mt-2 text-sm" :class="stat.noteClass">
          {{ stat.note }}
        </p>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto rounded-lg bg-white shadow">
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-100">
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
                v-model.number="tempStocks[item.sku]"
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