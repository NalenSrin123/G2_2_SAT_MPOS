<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div
      class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-gray-200"
    >
      <!-- Icon -->
      <div class="flex justify-center mb-6">
        <div
          class="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center"
        >
        </div>
      </div>

      <!-- Title -->
      <h1 class="text-3xl font-bold text-center text-gray-800">
        Reset Your Password
      </h1>

      <p class="text-center text-gray-500 mt-3 mb-8">
        Enter the email address associated with your account and we will send
        you a link to reset your password.
      </p>

      <!-- Form -->
      <form @submit.prevent="sendResetLink">
        <div>
          <label class="block text-gray-700 font-medium mb-2">
            Email Address
          </label>

          <div class="relative">
            <Mail
              class="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2"
            />

            <input
              v-model="email"
              type="email"
              placeholder="name@company.com"
              class="w-full border border-gray-300 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
        </div>

        <!-- Button -->
        <button
          type="submit"
          class="w-full mt-6 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-xl transition duration-200"
        >
          Send Reset Link →
        </button>
      </form>

      <!-- Divider -->
      <div class="border-t border-gray-200 my-8"></div>

      <!-- Back -->
      <div class="text-center">
        <router-link
          to="/login"
          class="inline-flex items-center gap-2 text-blue-700 font-medium hover:underline"
        >
          <ArrowBigLeft class="w-5 h-5" />
          <span>Back to Sign In</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ArrowBigLeft, Mail } from "lucide-vue-next";
import { ref } from "vue";

const email = ref("");

const sendResetLink = () => {
  console.log("Reset link sent to:", email.value);

  // API Call Here
  // await axios.post('/forgot-password', { email: email.value })
};
</script>
