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
        <div v-for="item in queue" :key="item" class="flex items-center justify-between rounded-md border border-slate-100 px-4 py-3">
          <span class="text-sm font-semibold text-slate-700">{{ item }}</span>
          <button class="text-sm font-bold text-[#00449e] hover:text-[#00387f]" type="button">Export</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const reports = [
  { period: 'Today', title: 'Net Sales', value: '$12.4K', note: '+8.4% compared with yesterday' },
  { period: 'This Week', title: 'Inventory Turnover', value: '4.8x', note: 'Healthy movement across key SKUs' },
  { period: 'This Month', title: 'Refund Rate', value: '1.2%', note: 'Below operating threshold' },
]

const queue = ['Daily sales summary', 'Low stock export', 'Customer purchase history']
</script>
