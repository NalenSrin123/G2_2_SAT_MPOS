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
        <router-link to="/add-user"  class="rounded-md bg-[#00449e] px-4 py-2 text-sm font-bold text-white hover:bg-[#00387f]" type="button">
          Add User
        </router-link>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full min-w-[680px] text-left text-sm">
          <thead class="text-xs uppercase tracking-[1px] text-slate-500">
            <tr class="border-b border-slate-100">
              <th class="px-5 py-3">Username</th>
              <th class="px-5 py-3">Email</th>
              <th class="px-5 py-3">Role</th>
              <th class="px-5 py-3">Password</th>
              <th class="px-5 py-3">Verification</th>
              <th class="px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="5" class="px-5 py-4 text-center">
                Loading...
              </td>
            </tr>

            <tr v-else-if="error">
              <td colspan="5" class="px-5 py-4 text-center text-red-600">
                {{ error }}
              </td>
            </tr>
            
            <tr v-else v-for="user in users" :key="user.id" class="border-b border-slate-100 last:border-0">
              <td class="px-5 py-4 font-bold text-slate-900">{{ user.name }}</td>
              <td class="px-5 py-4 text-slate-600">{{ user.email }}</td>
              <td class="px-5 py-4 text-slate-600">{{ user.role }}</td>
              <td class="px-5 py-4 font-semibold text-slate-900">********</td>
              <td class="px-5 py-4">
                <span class="rounded-full px-3 py-1 text-xs font-bold" :class="user.is_verified ?'bg-emerald-100 text-emerald-700':'bg-red-100 text-red-700'">
                  {{ user.is_verified ? "Verified" : "Not Verified" }}
                </span>
              </td>
              <td class="px-5 py-5">
                <router-link :to="{
                  path: '/add-user',
                  query: {
                    mode: 'edit',
                    id: user.id
                  }
              }">
                <button type="button" class="rounded-lg bg-blue-500 px-4  py-1 text-sm text-white hover:bg-blue-600"
                @click="goToEditUser">
                Edit
              </button>
            </router-link>
          </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const users = ref([])
const loading = ref(false)
const error = ref("")

const fetchUsers = async () => {
  loading.value = true
  error.value = ""

  try {
    const response = await axios.get("https://g2-2-sat-pos-back.onrender.com/api/users")

    console.log("API Response:", response.data)

    users.value = response.data
  }catch(err){
    console.error(err)

    if(err.response) {
      console.log("Status:", err.response.status)
      console.log("Data:", err.response.data)

      error.value = err.response.data.message || "Server Error"
    }else {
      error.value = err.message
    }
  }finally{
    loading.value=false
  }
}
  onMounted(() => {
    fetchUsers()
  })
</script>
