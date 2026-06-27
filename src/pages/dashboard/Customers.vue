<template>
  <div class="min-h-screen p-6">
    <section class="mb-6">
      <p class="text-sm font-semibold uppercase tracking-[2px] text-[#00449e]">Users</p>
      <h1 class="mt-2 text-3xl font-bold text-slate-950">User Directory</h1>
      <p class="mt-2 text-sm text-slate-500">Review user profiles, roles, and account status.</p>
    </section>

    <section class="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div class="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
        <h2 class="text-lg font-bold text-slate-950">User List</h2>
        <button class="rounded-md bg-[#00449e] px-4 py-2 text-sm font-bold text-white hover:bg-[#00387f]" type="button">
          Add User
        </button>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full min-w-170 text-left text-sm">
          <thead class="text-xs uppercase tracking-[1px] text-slate-500">
            <tr class="border-b border-slate-100">
              <th class="px-5 py-3">Username</th>
              <th class="px-5 py-3">Email</th>
              <th class="px-5 py-3">Role</th>
              <th class="px-5 py-3">Password</th>
              <th class="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.email" class="border-b border-slate-100 last:border-0">
              <td class="px-5 py-4 font-bold text-slate-900">{{ user.username }}</td>
              <td class="px-5 py-4 text-slate-600">{{ user.email }}</td>
              <td class="px-5 py-4 text-slate-600">{{ user.role }}</td>
              <td class="px-5 py-4 font-semibold text-slate-900">{{ user.password }}</td>
              <td class="px-5 py-4">
                <span class="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">{{ user.status }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup>
const users = [
  { username: 'eleanor_j', email: 'eleanor@example.com', role: 'Admin', password: '••••••••', status: 'Active' },
  { username: 'marcus_b', email: 'marcus@example.com', role: 'Manager', password: '••••••••', status: 'Active' },
  { username: 'kelly_w', email: 'kelly@example.com', role: 'User', password: '••••••••', status: 'Active' },
]
</script>
