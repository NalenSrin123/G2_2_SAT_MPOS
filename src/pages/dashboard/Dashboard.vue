<template>
  <div class="min-h-screen p-6">
    <section class="mb-6">
      <p class="text-sm font-semibold uppercase tracking-[2px] text-[#00449e]">Overview</p>
      <h1 class="mt-2 text-3xl font-bold text-slate-950">Dashboard</h1>
      <p class="mt-2 text-sm text-slate-500">Track sales, inventory, orders, and product activity from one workspace.</p>
    </section>

    <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <article
        v-for="stat in stats"
        :key="stat.label"
        class="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
      >
        <p class="text-xs font-semibold uppercase tracking-[1.5px] text-slate-500">{{ stat.label }}</p>
        <strong class="mt-3 block text-2xl font-bold text-slate-950">{{ stat.value }}</strong>
        <span class="mt-2 block text-sm font-medium" :class="stat.color">{{ stat.note }}</span>
      </article>
    </section>

    <section class="mt-6 grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
      <article class="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div class="mb-5 flex items-center justify-between">
          <h2 class="text-lg font-bold text-slate-950">Recent Orders</h2>
          <RouterLink to="/order" class="text-sm font-bold text-[#00449e] hover:text-[#00387f]">View all</RouterLink>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full min-w-[620px] text-left text-sm">
            <thead>
              <tr class="border-b border-slate-100 text-xs uppercase tracking-[1px] text-slate-500">
                <th class="py-3">Order</th>
                <th class="py-3">Customer</th>
                <th class="py-3">Total</th>
                <th class="py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in orders" :key="order.id" class="border-b border-slate-100 last:border-0">
                <td class="py-4 font-bold text-[#00449e]">{{ order.id }}</td>
                <td class="py-4 text-slate-700">{{ order.customer }}</td>
                <td class="py-4 font-semibold text-slate-900">{{ order.total }}</td>
                <td class="py-4">
                  <span class="rounded-full px-3 py-1 text-xs font-bold" :class="order.statusClass">{{ order.status }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>

      <article class="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 class="text-lg font-bold text-slate-950">Quick Actions</h2>
        <div class="mt-5 grid gap-3">
          <RouterLink to="/list_inventory" class="rounded-md border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:border-[#00449e] hover:text-[#00449e]">
            Check Inventory
          </RouterLink>
          <RouterLink to="/products" class="rounded-md border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:border-[#00449e] hover:text-[#00449e]">
            Manage Products
          </RouterLink>
          <RouterLink to="/create_product" class="rounded-md bg-[#00449e] px-4 py-3 text-center text-sm font-bold text-white hover:bg-[#00387f]">
            Create Product
          </RouterLink>
        </div>
      </article>
    </section>
  </div>
</template>

<script setup>
const stats = [
  { label: 'Today Sales', value: '$12,480', note: '+8.4% from yesterday', color: 'text-emerald-600' },
  { label: 'Open Orders', value: '42', note: '7 waiting payment', color: 'text-amber-600' },
  { label: 'Products', value: '1,240', note: '18 low stock', color: 'text-red-600' },
  { label: 'Customers', value: '8,920', note: '+126 this month', color: 'text-[#00449e]' },
]

const orders = [
  { id: '#ORD-9021', customer: 'Eleanor Johnson', total: '$156.40', status: 'Completed', statusClass: 'bg-emerald-100 text-emerald-700' },
  { id: '#ORD-9022', customer: 'Marcus Bennett', total: '$42.00', status: 'Pending', statusClass: 'bg-amber-100 text-amber-700' },
  { id: '#ORD-9023', customer: 'Sarah Connor', total: '$294.10', status: 'Cancelled', statusClass: 'bg-red-100 text-red-700' },
]
</script>
