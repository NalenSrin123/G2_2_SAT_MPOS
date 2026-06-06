<template>
  <main class="min-h-screen bg-[#f7f8fb] px-4 py-5 text-[#22252c] sm:px-7 sm:py-6.5">
    <!-- Main Card -->
    <div class="bg-white rounded-2xl shadow-sm w-full max-w-[1100px] overflow-hidden relative border border-gray-100">
      
      <!-- Top Actions -->
      <div class="p-6 flex items-center justify-between border-b border-gray-100">
        <!-- Tabs -->
        <div class="flex items-center bg-slate-100/80 p-1.5 rounded-xl">
          <button 
            v-for="tab in tabs" :key="tab" @click="activeTab = tab"
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
          <button class="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
            Filters
          </button>
          <button class="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
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
            <tr v-for="order in orders" :key="order.id" class="hover:bg-gray-50/50 transition-colors group">
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
                  <div class="text-gray-700 font-medium text-sm leading-tight max-w-[100px]">
                    {{ order.customerName.replace(' ', '\n') }}
                    <span class="whitespace-pre-line">{{ order.customerName }}</span>
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
                <div class="text-gray-900 font-black text-sm mt-1">{{ order.totalPrice }}</div>
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
          Showing 1-10 of 245 orders
        </span>
        <div class="flex items-center gap-2">
          <button class="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-400 hover:bg-gray-100 transition-colors shadow-sm bg-white">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          
          <template v-for="(page, index) in pages" :key="index">
            <button 
              v-if="page !== '...'"
              class="w-8 h-8 flex items-center justify-center rounded-md text-sm font-bold transition-colors shadow-sm"
              :class="page === 1 ? 'bg-[#002f87] text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'"
            >
              {{ page }}
            </button>
            <span v-else class="w-8 h-8 flex items-center justify-center text-gray-400 font-bold tracking-widest">...</span>
          </template>
          <button class="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-400 hover:bg-gray-100 transition-colors shadow-sm bg-white">
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
import { ref } from 'vue'
const tabs = ['All Orders', 'Pending', 'Completed', 'Cancelled']
const activeTab = ref('All Orders')
const orders = ref([
  {
    id: '#ORD-9021',
    customerName: 'Eleanor\nJohnson',
    initials: 'EJ',
    date: 'Oct 24, 2023',
    time: '10:30 AM',
    items: '3 Items',
    totalPrice: '$156.40',
    status: 'COMPLETED'
  },
  {
    id: '#ORD-9022',
    customerName: 'Marcus\nBennett',
    initials: 'MB',
    date: 'Oct 24, 2023',
    time: '11:15 AM',
    items: '1 Item',
    totalPrice: '$42.00',
    status: 'PENDING'
  },
  {
    id: '#ORD-9023',
    customerName: 'Sarah\nConnor',
    initials: 'SC',
    date: 'Oct 24, 2023',
    time: '01:45 PM',
    items: '5 Items',
    totalPrice: '$294.10',
    status: 'CANCELLED'
  },
  {
    id: '#ORD-9024',
    customerName: 'David\nRivera',
    initials: 'DR',
    date: 'Oct 24, 2023',
    time: '02:10 PM',
    items: '2 Items',
    totalPrice: '$89.99',
    status: 'COMPLETED'
  },
  {
    id: '#ORD-9025',
    customerName: 'Kelly\nWilliams',
    initials: 'KW',
    date: 'Oct 24, 2023',
    time: '03:00 PM',
    items: '4 Items',
    totalPrice: '$210.50',
    status: 'PENDING'
  }
])
const pages = [1, 2, 3, '...', 25]
</script>
<style scoped>
/* Optional styling adjustments */
.whitespace-pre-line {
  white-space: pre-line;
}
</style>
