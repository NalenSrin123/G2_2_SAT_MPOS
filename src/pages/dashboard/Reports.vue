<template>
  <div class="min-h-screen p-6">
    <section class="mb-6">
      <p class="text-sm font-semibold uppercase tracking-[2px] text-[#00449e]">Reports</p>
      <h1 class="mt-2 text-3xl font-bold text-slate-950">Business Reports</h1>
      <p class="mt-2 text-sm text-slate-500">Monitor sales, inventory movement, and team performance.</p>
    </section>

    <section class="grid gap-4 md:grid-cols-3">
      <article v-for="report in reports" :key="report.title" class="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p class="text-xs font-semibold uppercase tracking-[1.5px] text-slate-500">{{ report.period }}</p>
        <h2 class="mt-3 text-lg font-bold text-slate-950">{{ report.title }}</h2>
        <strong class="mt-4 block text-3xl font-bold text-[#00449e]">{{ report.value }}</strong>
        <p class="mt-2 text-sm font-medium text-slate-500">{{ report.note }}</p>
      </article>
    </section>

    <section class="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h2 class="text-lg font-bold text-slate-950">Report Queue</h2>
      <div class="mt-4 grid gap-3">
        <div v-for="item in queue" :key="item" class="flex items-center justify-between rounded-md border border-slate-200 px-4 py-3">
          <span class="text-sm font-semibold text-slate-700">{{ item.name }}</span>
          <button 
          class="text-sm font-bold hover:bg-[#00387f] bg-[#00449e] text-white px-4 py-2 rounded-md" 
          type="button"
          @click="openExportModal(item)">Export</button>
        </div>
      </div>
    </section>
  </div>

   <!-- Export Confirmation Modal -->
    <div v-if="showConfirmModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <div class="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

        <!-- Close Button -->
        <button
          @click="closeModal"
          class="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-sm text-white bg-red-500 transition hover:bg-red-700 "
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
          </svg>
        </button>

        <h3 class="text-xl font-bold text-slate-900">
          Export Report
        </h3>

        <p class="mt-3 text-sm text-slate-600">
          Are you sure you want to export
          <span class="font-semibold text-[#00449e]">
            "{{ selectedReport?.name }}"
          </span>
          as an Excel file?
        </p>

        <div class="mt-6 flex justify-end gap-3">
          <button
            class="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-white bg-red-500 transition hover:bg-red-700"
            @click="closeModal"
          >
            Cancel
          </button>

          <button
            class="rounded-lg bg-[#00449e] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#00387f]"
            @click="confirmExport"
          >
            Export
          </button>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import * as XLSX from 'xlsx'

const showConfirmModal = ref(false)
const selectedReport = ref(null)

const reports = [
  {
    period: 'Today',
    title: 'Net Sales',
    value: '$12.4K',
    note: '+8.4% compared with yesterday',
  },
  {
    period: 'This Week',
    title: 'Inventory Turnover',
    value: '4.8x',
    note: 'Healthy movement across key SKUs',
  },
  {
    period: 'This Month',
    title: 'Refund Rate',
    value: '1.2%',
    note: 'Below operating threshold',
  },
]

const queue = [
  {
    name: 'Daily Sales Summary',
    data: [
      { Date: '2026-06-20', Sales: 1250, Orders: 32 },
      { Date: '2026-06-21', Sales: 1430, Orders: 41 },
    ],
  },
  {
    name: 'Low Stock Export',
    data: [
      { Product: 'Mouse', Stock: 3 },
      { Product: 'Keyboard', Stock: 5 },
    ],
  },
  {
    name: 'Customer Purchase History',
    data: [
      { Customer: 'John', TotalSpent: 1200 },
      { Customer: 'Sarah', TotalSpent: 850 },
    ],
  },
]

// Open Modal
const openExportModal = (report) => {
  selectedReport.value = report
  showConfirmModal.value = true
}

// Close Modal
const closeModal = () => {
  showConfirmModal.value = false
  selectedReport.value = null
}

// Confirm Export
const confirmExport = () => {
  if (!selectedReport.value) return

  const worksheet = XLSX.utils.json_to_sheet(
    selectedReport.value.data
  )

  const workbook = XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    selectedReport.value.name.substring(0, 31)
  )

  XLSX.writeFile(
    workbook,
    `${selectedReport.value.name.replace(/\s+/g, '_')}.xlsx`
  )

  closeModal()
}
</script>