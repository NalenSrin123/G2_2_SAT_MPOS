<template>
  <div class="min-h-screen p-6">
    <section class="mb-6">
      <p class="text-sm font-semibold uppercase tracking-[2px] text-[#00449e]">Customers</p>
      <h1 class="mt-2 text-3xl font-bold text-slate-950">Customer Directory</h1>
      <p class="mt-2 text-sm text-slate-500">Review customer profiles, order activity, and loyalty status.</p>
    </section>

    <section class="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div class="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
        <h2 class="text-lg font-bold text-slate-950">Top Customers</h2>
        <button class="rounded-md bg-[#00449e] px-4 py-2 text-sm font-bold text-white hover:bg-[#00387f]" type="button">
          Add Customer
        </button>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full min-w-[680px] text-left text-sm">
          <thead class="text-xs uppercase tracking-[1px] text-slate-500">
            <tr class="border-b border-slate-100">
              <th class="px-5 py-3">Name</th>
              <th class="px-5 py-3">Phone</th>
              <th class="px-5 py-3">Orders</th>
              <th class="px-5 py-3">Total Spend</th>
              <th class="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="customer in customers" :key="customer.phone" class="border-b border-slate-100 last:border-0">
              <td class="px-5 py-4 font-bold text-slate-900">{{ customer.name }}</td>
              <td class="px-5 py-4 text-slate-600">{{ customer.phone }}</td>
              <td class="px-5 py-4 text-slate-600">{{ customer.orders }}</td>
              <td class="px-5 py-4 font-semibold text-slate-900">{{ customer.spend }}</td>
              <td class="px-5 py-4">
                <span class="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">{{ customer.status }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup>
const customers = [
  { name: 'Eleanor Johnson', phone: '+1 555 0142', orders: 18, spend: '$2,420.00', status: 'Active' },
  { name: 'Marcus Bennett', phone: '+1 555 0188', orders: 11, spend: '$1,140.50', status: 'Active' },
  { name: 'Kelly Williams', phone: '+1 555 0165', orders: 9, spend: '$920.25', status: 'Active' },
]
</script>
