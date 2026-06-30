<template>
  <div class="min-h-screen p-6">
    <section class="mb-6">
      <p class="text-sm font-semibold uppercase tracking-[2px] text-[#00449e]">Settings</p>
      <h1 class="mt-2 text-3xl font-bold text-slate-950">Store Settings</h1>
      <p class="mt-2 text-sm text-slate-500">Manage store details, receipt options, and account preferences.</p>
    </section>

    <section class="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
      <article class="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 class="text-lg font-bold text-slate-950">Store Profile</h2>
        <div class="mt-5 space-y-4">
          <label class="block text-sm font-semibold text-slate-700">
            Store Name
            <input class="mt-2 w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#00449e]" value="MPOS Admin" />
          </label>
          <label class="block text-sm font-semibold text-slate-700">
            Business Email
            <input class="mt-2 w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#00449e]" value="admin@mpos.test" />
          </label>
          <button class="rounded-md bg-[#00449e] px-4 py-2 text-sm font-bold text-white hover:bg-[#00387f]" type="button">
            Save Changes
          </button>
        </div>
      </article>

      <article class="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 class="text-lg font-bold text-slate-950">Preferences</h2>
        <div class="mt-5 divide-y divide-slate-100">
          <label v-for="setting in settings" :key="setting" class="flex items-center justify-between py-4 text-sm font-semibold text-slate-700">
            {{ setting }}
            <input class="h-5 w-5 accent-[#00449e]" type="checkbox" checked />
          </label>
        </div>
      </article>
    </section>
  </div>
</template>

<script setup>
const settings = ['Email low stock alerts', 'Print receipt after sale', 'Require manager approval for refunds']
</script>
