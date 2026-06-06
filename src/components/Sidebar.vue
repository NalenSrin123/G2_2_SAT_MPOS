<template>
    <div class="w-50 h-screen bg-slate-600 text-white flex flex-col">
        <div class="p-4 flex items-center gap-3 mt-2">
            <div class="flex item-center justify-center bg-white rounded-xl w-10 h-10   "><Archive class="text-blue-900 mt-2" :size="24" /></div>
        <div class="flex flex-col">
            <h1 class=" font-bold text-white tracking-wide leading-none">MPOS Admin</h1>
            <p class="text-xs text-gray-400 tracking-wide mt-1">ENTERPRISE SUITE</p>
        </div>
        </div>
        
        <nav class=" flex-1 mt-2 ">
            <RouterLink to="/dashboard" class="flex items-center gap-3 p-3 rounded hover:bg-slate-500  text-gray-300 hover:text-gray-100">
              <LayoutDashboard :size="20" /> <span class="text-sm">Dashboard</span> 
            </RouterLink>
            <RouterLink to="/inventory" class="flex items-center gap-3 p-3 rounded hover:bg-slate-500  text-gray-300 hover:text-gray-100">
                <Archive :size="20" /><span class="text-sm">Inventory</span>
            </RouterLink>
            <RouterLink to="/order" class="flex items-center gap-3 p-3 rounded hover:bg-slate-500  text-gray-300 hover:text-gray-100">
               <ShoppingCart :size="20" /> <span class="text-sm">Orders</span>
            </RouterLink>
            <RouterLink to="/products" class="flex items-center gap-3 p-3 rounded hover:bg-slate-500  text-gray-300 hover:text-gray-100">
                <Shapes :size="20" /><span class="text-sm">Products</span>
            </RouterLink>
            <RouterLink to="/customers" class="flex items-center gap-3 p-3 rounded hover:bg-slate-500  text-gray-300 hover:text-gray-100">
               <Users :size="20"/> <span class="text-sm">Customers</span>
            </RouterLink>
            <RouterLink to="reports" class="flex items-center gap-3 p-3 rounded hover:bg-slate-500  text-gray-300 hover:text-gray-100">
                <SquareKanban :size="20" /><span class="text-sm">Reports</span>
            </RouterLink>
        </nav>
        <!-- Button -->
         <div class="p-4 border-t border-slate-500 flex flex-col ">
            <button class="w-full bg-blue-800 hover:bg-blue-700 py-3 rounded-lg text-sm mt-2 ">+ New Sale</button>
            <RouterLink to="/settings" class="flex items-center gap-3 p-3 rounded hover:bg-slate-500 text-gray-300 hover:text-gray-100"><Settings :size="20"/><span class="text-sm">Settings</span></RouterLink>
            <RouterLink to="/logout" class="flex items-center gap-3  p-3 rounded hover:bg-slate-500 text-gray-300 hover:text-gray-100"><LogIn :size="20" /><span class="text-sm"> Logout</span></RouterLink>
         </div>

    </div>
</template>

<script setup>
import { LogIn, Settings, LayoutDashboard, Archive, ShoppingCart, Shapes, Users, SquareKanban  } from 'lucide-vue-next';

</script>

<style  scoped>

</style>