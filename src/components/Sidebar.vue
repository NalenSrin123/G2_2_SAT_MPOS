<script setup>
import {
  Archive,
  LayoutDashboard,
  LogIn,
  Settings,
  Shapes,
  ShoppingCart,
  SquareKanban,
  Users,
} from 'lucide-vue-next'

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Inventory', to: '/list_inventory', icon: Archive },
  { label: 'Orders', to: '/order', icon: ShoppingCart },
  { label: 'Products', to: '/products', icon: Shapes },
  { label: 'Categories', to: '/categories', icon: Shapes },
  { label: 'Customers', to: '/customers', icon: Users },
  { label: 'Reports', to: '/reports', icon: SquareKanban },
]
</script>

<template>
  <aside class="sticky top-0 flex h-screen w-64 shrink-0 flex-col bg-[#1f2937] text-white shadow-xl">
    <div class="border-b border-white/10 px-5 py-5">
      <div class="flex items-center gap-3">
        <div class="grid h-11 w-11 place-items-center rounded-lg bg-white text-[#00449e] shadow-sm">
          <Archive :size="24" />
        </div>
        <div class="min-w-0">
          <h1 class="truncate text-base font-bold leading-none tracking-wide">MPOS Admin</h1>
          <p class="mt-1 text-[11px] font-semibold tracking-[1.8px] text-slate-400">ENTERPRISE SUITE</p>
        </div>
      </div>
    </div>

    <nav class="flex-1 space-y-1 px-3 py-4" aria-label="Main navigation">
      <RouterLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="flex h-11 items-center gap-3 rounded-md px-3 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
        active-class="bg-[#00449e] text-white shadow-sm"
      >
        <component :is="item.icon" :size="20" />
        <span>{{ item.label }}</span>
      </RouterLink>
    </nav>

    <div class="border-t border-white/10 p-3">
      <RouterLink
        to="/create_product"
        class="mb-2 flex h-11 w-full items-center justify-center rounded-md bg-[#00449e] px-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#00387f]"
      >
        + New Product
      </RouterLink>
      <RouterLink
        to="/settings"
        class="flex h-11 items-center gap-3 rounded-md px-3 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
        active-class="bg-white/10 text-white"
      >
        <Settings :size="20" />
        <span>Settings</span>
      </RouterLink>
      <RouterLink
        to="/login"
        class="flex h-11 items-center gap-3 rounded-md px-3 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
      >
        <LogIn :size="20" />
        <span>Logout</span>
      </RouterLink>
    </div>
  </aside>
</template>
