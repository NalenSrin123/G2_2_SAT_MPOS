<template>
  <main class="min-h-screen bg-[#f4f6f9] p-0">
    <section class="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <header class="border-b border-slate-200 pb-5">
        <div class="space-y-1">
          <router-link
            to="/customers"
            class="inline-flex items-center gap-2 rounded-lg px-1 text-sm font-medium text-slate-600 transition hover:text-blue-700"
          >
            <span class="text-lg leading-none">&larr;</span>
            Back to Users
          </router-link>

          <div>
            <h1 class="my-2 text-3xl font-bold text-slate-950 sm:text-3xl">
              {{ isEditing ? 'Edit User' : 'Add New User' }}
            </h1>
            <p class="max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              {{ isEditing ? 'Update the selected user account details.' : 'Create a new user account and assign their role.' }}
            </p>
          </div>
        </div>
      </header>

      <form
        id="add-user-form"
        class="w-full"
        @submit.prevent="handleSubmit"
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
            <div class="grid gap-4 md:grid-cols-2">
              <div>
                <label class="mb-2 block text-sm font-semibold text-slate-700">
                  Username
                </label>
                <BaseInput
                  v-model="form.name"
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

            <div class="grid gap-4 md:grid-cols-2">
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
                    class="w-full cursor-pointer appearance-none rounded-lg border border-slate-300 bg-white px-4 py-2 pr-10 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-blue-100"
                  >
                    <option value="" disabled selected>Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">user</option>
                  </select>
                  <i class="fa-solid fa-chevron-down pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-blue-600"></i>
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-col-reverse gap-3 border-t border-slate-100 p-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              class="inline-flex h-11 items-center justify-center rounded-lg border border-slate-300 bg-red-500 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-600"
              @click="discardForm"
            >
              Discard
            </button>

            <button
              v-if="!isEditing"
              type="submit"
              class="inline-flex h-11 items-center justify-center rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Add User
            </button>

            <button
              v-else
              type="submit"
              class="inline-flex h-11 items-center justify-center rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Edit User
            </button>
          </div>
        </section>
      </form>
    </section>
  </main>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseInput from '../../components/base/BaseInput.vue'
import api from '../../services/api'

const route = useRoute()
const router = useRouter()

const form = reactive({
  id: '',
  name: '',
  email: '',
  password: '',
  role: '',
})

const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

async function addUser() {
  if (!form.name || !form.email || !form.password || !form.role) {
    errorMessage.value = 'Please fill in all fields.'
    return
  }

  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    await api.post('/users', {
      name: form.name,
      email: form.email,
      password: form.password,
      role: form.role,
    })

    successMessage.value = 'User created successfully.'
    Object.assign(form, {
      name: '',
      email: '',
      password: '',
      role: '',
    })
    router.push('/customers')
  } catch (error) {
    errorMessage.value = error?.response?.data?.message || 'Failed to create user. Please try again.'
  } finally {
    loading.value = false
  }
}
const isEditing = computed(() => route.query.mode === 'edit')

// get id from URL
const userId = computed(() => route.query.id)

// Fetch user data when edit
async function getUser() {
  if (!isEditing.value) return

  try {
    const response = await api.get(`/users/${userId.value}`)
    const data = response.data

    console.log(data)

    form.id = data.id
    form.name = data.name
    form.email = data.email
    form.role = data.role
  } catch (error) {
    console.log(error)
  }
}

async function updateUser() {
  if (!form.name || !form.email || !form.role) {
    errorMessage.value = 'Please fill in all required fields.'
    return
  }

  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const response = await api.put(`/users/${userId.value}`, {
      name: form.name,
      email: form.email,
      role: form.role,
    })

    const data = response.data
    console.log(data)

    alert('User updated successfully')
    router.push('/customers')
  } catch (error) {
    errorMessage.value = error?.response?.data?.message || 'Failed to update user.'
  } finally {
    loading.value = false
  }
}

function discardForm() {
  form.name = ''
  form.email = ''
  form.password = ''
  form.role = ''
}

function handleSubmit() {
  if (isEditing.value) {
    updateUser()
    return
  }

  addUser()
}

onMounted(() => {
  getUser()
})
</script>
