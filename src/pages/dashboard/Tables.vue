<template>
    <div class="min-h-screen bg-slate-50 p-6">
        <section class="mb-6">
            <p class="text-sm font-semibold uppercase tracking-[2px] text-[#00449e]">Tables</p>
            <h1 class="mt-2 text-3xl font-bold text-slate-950">Table Directory</h1>
            <p class="mt-2 text-sm text-slate-500">Review table availability, status, and actions.</p>
        </section>

        <section class="rounded-lg border border-slate-200 bg-white shadow-sm">
            <div
                class="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
                <h2 class="text-lg font-bold text-slate-950">Table List</h2>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full min-w-[700px] text-left text-sm">
                    <thead class="text-xs uppercase tracking-[1px] text-slate-500">
                        <tr class="border-b border-slate-100">
                            <th class="px-5 py-3">Table Number</th>
                            <th class="px-5 py-3">Status</th>
                            <th class="px-5 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="table in tables" :key="table.id" class="border-b border-slate-100 last:border-0">
                            <td class="px-5 py-4 font-semibold text-slate-700">{{ table.id }}</td>
                            <td class="px-5 py-4">
                                <span
                                    :class="table.status === 'inactive' || table.status === 'Inactive' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'"
                                    class="rounded-full px-3 py-1 text-xs font-bold capitalize">
                                    {{ table.status ? table.status : 'Active' }}
                                </span>
                            </td>
                            <td class="px-5 py-4">
                                <div class="flex items-center gap-2">
                                    <button type="button"
                                        class="rounded bg-rose-600 px-3 py-1 text-xs font-bold text-white transition hover:bg-rose-700">
                                        Delete
                                    </button>
                                    <button type="button"
                                        class="rounded bg-blue-500 px-3 py-1 text-xs font-bold text-white transition hover:bg-blue-600">
                                        Edit
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </div>
</template>

<script setup>
const tables = [
    { id: '123', status: 'Active' },
    { id: '245', status: 'Inactive' },
    { id: '367', status: 'Active' }
]

</script>
