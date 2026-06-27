<template>
  <main class="min-h-screen bg-[#f4f6f9] p-0">
    <section class="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <header class="border-b border-slate-200 pb-5">
        <div class="space-y-1">
          <router-link
            to="/customers"
            class="inline-flex items-center gap-2 rounded-lg px-1  text-sm font-medium text-slate-600 transition hover:text-blue-700"
          >
            <span class="text-lg leading-none">&larr;</span>
            Back to Users
          </router-link>

          <div>
            <h1 class="my-2 text-3xl font-bold text-slate-950 sm:text-3xl">
              Add New User
            </h1>
            <p class="max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Create a new user account and assign their role.
            </p>
          </div>
        </div>
      </header>

      <form
        id="add-user-form"
        class="w-full"
        @submit.prevent="addUser"
      >
        <section class="rounded-lg border border-slate-200 bg-white shadow-sm">
          <div class="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div class="text-[#1b47ca] text-2xl">
                <i class="fa-solid fa-user-plus"></i>
              </div>
              <h2 class="mt-1 text-xl font-semibold text-slate-950">
                Account Details
              </h2>
            </div>
          </div>

          <div class="space-y-5 p-5">
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="mb-2 block text-sm font-semibold text-slate-700">
                  Username
                </label>
                <BaseInput
                  v-model="form.username"
                  type="text"
                  placeholder="Enter username"
                />
              </div>

              <div>
                <label class="mb-2 block text-sm font-semibold text-slate-700">
                  Email
                </label>
                <BaseInput
                  v-model="form.email"
                  type="email"
                  placeholder="Enter email address"
                />
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="mb-2 block text-sm font-semibold text-slate-700">
                  Password
                </label>
                <BaseInput
                  v-model="form.password"
                  type="password"
                  placeholder="Enter password"
                />
              </div>

              <div>
                <label class="mb-2 block text-sm font-semibold text-slate-700">
                  Role
                </label>
                <div class="relative">
                  <select
                    v-model="form.role"
                    class="w-full appearance-none rounded-lg border border-slate-300 bg-white px-4 py-2 pr-10 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-blue-100 cursor-pointer"
                  >
                    <option value="" disabled selected>Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="staff">Staff</option>
                  </select>
                  <i class="fa-solid fa-chevron-down pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-blue-600"></i>
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-3 border-t border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-end">
            <p v-if="errorMessage" class="text-sm font-medium text-red-600">{{ errorMessage }}</p>
            <p v-else-if="successMessage" class="text-sm font-medium text-green-600">{{ successMessage }}</p>

            <div class="flex flex-col-reverse gap-3 sm:flex-row">
              <button
                type="reset"
                class="inline-flex h-11 items-center justify-center rounded-lg border border-slate-300 bg-red-500 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-600"
              >
                Discard
              </button>

              <button
                type="submit"
                :disabled="loading"
                class="inline-flex h-11 items-center justify-center rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
              >
                {{ loading ? 'Creating...' : 'Add User' }}
              </button>
            </div>
          </div>
        </section>
      </form>
    </section>
  </main>
</template>

<script setup>
import { reactive, ref } from 'vue'
import BaseInput from '../../components/base/BaseInput.vue'
import api from '../../services/api'

const form = reactive({
  username: '',
  email: '',
  password: '',
  role: '',
})

const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

async function addUser() {
  if (!form.username || !form.email || !form.password || !form.role) {
    errorMessage.value = 'Please fill in all fields.'
    return
  }

  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    await api.post('/users', {
      name: form.username,
      email: form.email,
      password: form.password,
      role: form.role,
    })

    successMessage.value = 'User created successfully.'
    Object.assign(form, {
      username: '',
      email: '',
      password: '',
      role: '',
    })
  } catch (error) {
    errorMessage.value = error?.response?.data?.message || 'Failed to create user. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>