<template>
  <div class="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-6">
    <div class="border-b border-gray-100 pb-4 mb-6">
      <h2 class="text-xl font-bold text-gray-800">Create New User</h2>
      <p class="text-xs text-gray-500 mt-1">Add a new user to the system and assign their system role.</p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-5">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Full Name</label>
          <input
            v-model="form.name"
            type="text"
            placeholder="Enter your full name"
            class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            required
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Email Address</label>
          <input
            v-model="form.email"
            type="email"
            placeholder="Enter your email"
            class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            required
          />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Phone Number</label>
          <input
            v-model="form.phone"
            type="text"
            placeholder="+885"
            class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Role</label>
          <div class="relative">
            <select
              v-model="form.role"
              required
              class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer text-gray-700"
            >
              <option value="" disabled selected>Select user role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>

            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div>
        <label class="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Password</label>
        <input
          v-model="form.password"
          type="password"
          placeholder="••••••••"
          class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          required
        />
      </div>

      <div>
        <label class="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Account Status</label>
        <div class="flex items-center gap-4 mt-1">
          <label class="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input type="radio" v-model="form.status" value="Active" class="text-blue-600 focus:ring-blue-500" />
            <span
              :class="form.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-400 border-gray-200'"
              class="px-2.5 py-0.5 rounded-full text-xs font-medium border transition-all"
            >
              Active
            </span>
          </label>

          <label class="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input type="radio" v-model="form.status" value="Inactive" class="text-blue-600 focus:ring-blue-500" />
            <span
              :class="form.status === 'Inactive' ? 'bg-gray-200 text-gray-800 border-gray-300 font-semibold' : 'bg-gray-50 text-gray-400 border-gray-200'"
              class="px-2.5 py-0.5 rounded-full text-xs font-medium border transition-all"
            >
              Inactive
            </span>
          </label>
        </div>
      </div>

      <div class="flex items-center justify-end gap-3 border-t border-gray-100 pt-4 mt-6">
        <button
          type="button"
          @click="handleCancel"
          class="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="px-5 py-2 bg-[#1E62F7] hover:bg-[#1652D3] text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
        >
          Save User
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  name: '',
  email: '',
  phone: '',
  role: '',
  password: '',
  status: 'Active'
})

const handleSubmit = () => {
  console.log('Data to send to API:', form.value)
  alert('User created successfully! (Check console for data)')
  router.push('/dashboard')
}

const handleCancel = () => {
  if (confirm('Are you sure you want to discard changes?')) {
    form.value = { name: '', email: '', phone: '', role: '', password: '', status: 'Active' }
    router.push('/dashboard')
  }
}
</script>