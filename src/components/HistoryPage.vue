<script setup>
import { ref } from 'vue'
import { 
  ArrowLeft, 
  Bell, 
  Utensils, 
  RotateCcw, 
  ChevronRight 
} from 'lucide-vue-next'


const activeOrder = ref({
  id: '#ORD-1024',
  status: 'In Progress',
  statusLabel: 'Preparing your meal',
  price: '$32.77'
})

const pastOrders = ref([
  {
    id: '#ORD-982',
    date: 'June 12, 2023',
    status: 'Completed',
    items: ' Korean Beef Bibimbap Bowl',
    price: '$4',
    image: 'https://i.pinimg.com/1200x/32/b9/5f/32b95fc5d05e88ba409c5f26a3e70066.jpg'
  },
  {
    id: '#ORD-955',
    date: 'June 05, 2023',
    status: 'Completed',
    items: 'Korean Fried Chicken Wings',
    price: '$5',
    image: 'https://i.pinimg.com/1200x/ec/8a/ee/ec8aee3d078af75d59d2065bb774903b.jpg'
  }
])
</script>

<template>
  <div class="max-w-md mx-auto bg-[#F4F9F5] min-h-screen shadow-lg flex flex-col font-sans antialiased text-gray-800">
    
    <header class="flex items-center justify-between px-4 py-4 bg-[#F4F9F5] sticky top-0 z-10 border-b border-gray-200/60">
      <button class="p-1.5 hover:bg-emerald-600/10 rounded-full transition text-[#006847]">
        <ArrowLeft :size="22" />
      </button>
      
      <h1 class="text-base font-bold text-[#006847] tracking-wide uppercase">Savoury</h1>
      
      <button class="p-1.5 hover:bg-emerald-600/10 rounded-full transition text-[#006847] relative">
        <Bell :size="22" />
        <span class="absolute top-1.5 right-1.5 w-2 h-2"></span>
      </button>
    </header>

    <div class="px-5 pb-8 space-y-6 flex-1 overflow-y-auto">
      
      <div class="mt-5">
        <h2 class="text-2xl font-bold text-gray-900 tracking-tight">Order History</h2>
        <p class="text-xs text-gray-500 font-medium mt-0.5">Manage and track your gourmet experiences</p>
      </div>

      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="text-xs font-bold text-[#006847] uppercase tracking-wider">Active Order</h3>
          <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
        </div>

        <div class="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm relative overflow-hidden before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-emerald-600">
          <div class="flex justify-between items-start">
            <div>
              <span class="text-sm font-bold text-gray-900">{{ activeOrder.id }}</span>
              <div class="flex items-center gap-1.5 text-xs text-gray-600 mt-1 font-medium">
                <Utensils :size="14" class="text-[#006847]" />
                <span>{{ activeOrder.statusLabel }}</span>
              </div>
            </div>
            <span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
              {{ activeOrder.status }}
            </span>
          </div>

          <div class="flex justify-between items-center mt-6">
            <span class="text-2xl font-bold text-[#006847]">{{ activeOrder.price }}</span>
            <button class="bg-[#006847] hover:bg-[#005238] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-sm flex items-center gap-1">
              <span>Track Order</span>
            </button>
          </div>
        </div>
      </div>

      <div class="space-y-3">
        <h3 class="text-xs font-bold text-gray-500 uppercase tracking-wider">Past Orders</h3>

        <div class="space-y-4">
          <div 
            v-for="order in pastOrders" 
            :key="order.id" 
            class="bg-white rounded-2xl p-4 border border-gray-50 shadow-sm flex flex-col gap-3"
          >
            <div class="flex justify-between items-start">
              <div>
                <span class="text-sm font-bold text-gray-900">{{ order.id }}</span>
                <p class="text-[11px] text-gray-400 font-medium mt-0.5">{{ order.date }}</p>
              </div>
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-600 border border-gray-200">
                {{ order.status }}
              </span>
            </div>

            <div class="flex items-center justify-between mt-1">
              <div class="flex items-center gap-3">
                <img 
                  :src="order.image" 
                  :alt="order.items" 
                  class="w-14 h-14 rounded-xl object-cover border border-gray-100"
                />
                <div>
                  <h4 class="text-xs font-bold text-gray-800 leading-snug max-w-[150px]">{{ order.items }}</h4>
                  <p class="text-sm font-bold text-gray-500 mt-1">{{ order.price }}</p>
                </div>
              </div>

              <button class="flex items-center gap-1.5 border border-[#006847]/20 text-[#006847] bg-[#006847]/5 hover:bg-[#006847]/10 text-xs font-bold px-3 py-2 rounded-xl transition">
                <RotateCcw :size="14" stroke-width="2.5" />
                <span>Reorder</span>
              </button>
            </div>
          </div>
        </div>
        
      </div>

    </div>
  </div>
</template>