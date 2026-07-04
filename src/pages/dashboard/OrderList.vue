<template>
  <main class="min-h-screen bg-[#f7f8fb] px-4 py-5 text-[#22252c] sm:px-7 sm:py-6.5">
    <!-- Main Card -->
    <div class="bg-white rounded-2xl shadow-sm w-full overflow-hidden relative border border-gray-100">
      
      <!-- Top Actions -->
      <div class="p-6 flex items-center justify-between border-b border-gray-100">
        <!-- Tabs -->
        <div class="flex items-center bg-slate-100/80 p-1.5 rounded-xl">
          <button 
            v-for="tab in tabs" :key="tab" @click="activeTab = tab; currentPage = 1"
            :class="[
              'px-5 py-2 rounded-lg text-sm font-semibold transition-all',
              activeTab === tab 
                ? 'bg-white text-blue-700 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            ]"
          >
            {{ tab }}
          </button>
        </div>
        <!-- Buttons -->
        <div class="flex gap-3">
          <button @click="toggleFilters" class="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
            Filters
          </button>
          <button @click="exportCSV" class="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            Export CSV
          </button>
        </div>
      </div>  
      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-white border-b border-gray-100">
              <th class="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider w-[12%]">Order ID</th>
              <th class="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider w-[20%]">Customer Name</th>
              <th class="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider w-[15%]">Date</th>
              <th class="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider w-[10%]">Items</th>
              <th class="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider w-[15%] text-center">Total Price</th>
              <th class="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider w-[15%] text-center">Status</th>
              <th class="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider w-[13%] text-right">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="order in paginatedOrders" :key="order.id" class="hover:bg-gray-50/50 transition-colors group">
              <td class="py-4 px-6 align-top">
                <div class="text-[#1a4b9c] font-black text-sm tracking-wide mt-1">{{ order.id }}</div>
              </td>
              <td class="py-4 px-6 align-top">
                <div class="flex items-start gap-3">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                    :class="{
                      'bg-[#e2e8f0] text-[#1a4b9c]': order.initials === 'EJ',
                      'bg-[#dbeafe] text-[#1e40af]': order.initials === 'MB' || order.initials === 'KW',
                      'bg-[#fee2e2] text-[#991b1b]': order.initials === 'SC',
                      'bg-[#cffafe] text-[#0f766e]': order.initials === 'DR'
                    }"
                  >
                    {{ order.initials }}
                  </div>
                  <div class="text-gray-700 font-medium text-sm leading-tight max-w-25 whitespace-pre-line">
                    {{ order.customer_name || order.customerName }}
                  </div>
                </div>
              </td>
              <td class="py-4 px-6 align-top">
                <div class="flex flex-col gap-1 mt-1">
                  <span class="text-gray-700 font-medium text-sm">{{ order.date }}</span>
                  <span class="text-gray-400 text-xs font-medium">{{ order.time }}</span>
                </div>
              </td>
              <td class="py-4 px-6 align-top text-gray-600">
                <div class="text-sm font-medium mt-1">{{ order.items }}</div>
              </td>
              <td class="py-4 px-6 align-top text-center">
                <div class="text-gray-900 font-black text-sm mt-1">{{ order.total_price || order.total || order.totalPrice }}</div>
              </td>
              <td class="py-4 px-6 align-top text-center">
                <div class="mt-1">
                  <span 
                    class="px-3 py-1 text-[10px] uppercase font-bold rounded-md tracking-wider"
                    :class="{
                      'bg-[#dcfce7] text-[#166534]': order.status === 'COMPLETED',
                      'bg-[#fef08a] text-[#a16207]': order.status === 'PENDING',
                      'bg-[#fee2e2] text-[#991b1b]': order.status === 'CANCELLED'
                    }"
                  >
                    {{ order.status }}
                  </span>
                </div>
              </td>
              <td class="py-4 px-6 align-top text-right">
                <div class="mt-1">
                  <a href="#" class="text-[#1a4b9c] font-bold text-sm hover:text-blue-800 transition-colors">
                    View<br/>Details
                  </a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Pagination -->
      <div class="p-5 flex items-center justify-between border-t border-gray-100 bg-gray-50/50">
        <span class="text-sm text-gray-500 font-medium">
          Showing {{ ((currentPage - 1) * perPage) + 1 }}-{{ Math.min(currentPage * perPage, filteredOrders.length) }} of {{ filteredOrders.length }} orders
        </span>
        <div class="flex items-center gap-2">
          <button @click="currentPage > 1 ? currentPage-- : null" :disabled="currentPage === 1" class="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors shadow-sm bg-white disabled:opacity-50 disabled:cursor-not-allowed">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>

          <template v-for="(page, index) in pages" :key="index">
            <button 
              v-if="page !== '...'"
              @click="currentPage = page"
              class="w-8 h-8 flex items-center justify-center rounded-md text-sm font-bold transition-colors shadow-sm"
              :class="currentPage === page ? 'bg-[#002f87] text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'"
            >
              {{ page }}
            </button>
            <span v-else class="w-8 h-8 flex items-center justify-center text-gray-400 font-bold tracking-widest">...</span>
          </template>
          <button @click="currentPage < totalPages ? currentPage++ : null" :disabled="currentPage === totalPages" class="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-400 hover:bg-gray-100 transition-colors shadow-sm bg-white disabled:opacity-50 disabled:cursor-not-allowed">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>
      </div>
      
    </div>
    <!-- Floating Action Button -->
    <button class="fixed bottom-10 right-10 w-14 h-14 bg-[#002f87] hover:bg-blue-900 text-white rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-105 z-50">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
    </button>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import api from '../../services/api'

const tabs = ['All Orders', 'Pending', 'Completed', 'Cancelled']
const activeTab = ref('All Orders')
const currentPage = ref(1)
const perPage = 10

const orders = ref([])

const filteredOrders = computed(() => {
  if (activeTab.value === 'All Orders') {
    return orders.value
  }
  return orders.value.filter(order => order.status === activeTab.value.toUpperCase())
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredOrders.value.length / perPage)))

const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * perPage
  const end = start + perPage
  return filteredOrders.value.slice(start, end)
})

const pages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const result = []

  if (total <= 7) {
    for (let i = 1; i <= total; i++) result.push(i)
    return result
  }

  result.push(1)

  if (current > 3) result.push('...')

  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)

  for (let i = start; i <= end; i++) result.push(i)

  if (current < total - 2) result.push('...')

  result.push(total)

  return result
})

const toggleFilters = () => {
  // Placeholder for filter panel toggle
}

const exportCSV = () => {
const headers = ['Order ID', 'Customer Name', 'Date', 'Time', 'Items', 'Total Price', 'Status']
  
  const rows = filteredOrders.value.map(order => {
    const name = order.customer_name || order.customerName || 'N/A'
    const total = order.total_price || order.total || order.totalPrice || 0
    
    return [
      order.id,
      String(name).replace(/\n/g, ' '),
      order.date || '',
      order.time || '',
      order.items || 0,
      typeof total === 'string' ? parseFloat(total.replace(/[$,]/g, '')) : total, 
      order.status
    ]
  })
  const BOM = '\uFEFF'
  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = `orders_${new Date().toISOString().slice(0, 10)}.csv`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
const fetchOrders = async () => {
  try {
    const response = await api.get('/orders')
    
    if (response.data && response.data.data) {
      orders.value = response.data.data
    } else if (response.data && response.data.orders) {
      orders.value = response.data.orders
    } else {
      orders.value = Array.isArray(response.data) ? response.data : []
    }
  } catch (error) {
    console.error("Failed to fetch orders:", error.message)
  }
}

onMounted(() => {
  fetchOrders()
})
</script>
<style scoped>
.whitespace-pre-line {
  white-space: pre-line;
}
</style>
