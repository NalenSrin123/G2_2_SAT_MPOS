<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center flex-col px-4">
    <div class="w-full max-w-md bg-white  border border-gray-300 rounded-2xl shadow-lg p-8">
      <!-- Header --> 
      <div class="text-center">
        <div
          class="w-12 h-12 mx-auto bg-blue-800 rounded-[12px] flex items-center justify-center text-white text-xl"
        >
          <ShieldUser />
        </div>

        <h1 class="mt-4 text-xl font-bold text-blue-800">
          MPOS Management
        </h1>

        <p class="text-xs uppercase tracking-widest text-gray-400 mt-1">
          Nexus Terminal Suite
        </p>
      </div>

      <!-- Title -->
      <div class="text-center mt-8">
        <h2 class="text-2xl font-bold text-gray-800">
          Verify Your Identity
        </h2>

        <p class="mt-3 text-gray-500">
          We've sent a 6-digit code to your email
        </p>

        <p class="font-semibold text-gray-700">
          m***@etec.com
        </p>
      </div>

      <!-- OTP -->
      <div class="flex justify-center gap-3 mt-8">
        <input
          v-for="(digit, index) in otp"
          :key="index"
          :ref="el => otpInputs[index] = el"
          v-model="otp[index]"
          maxlength="1"
          type="text"
          class="w-12 h-14 border-2 rounded-lg text-center border-gray-400 text-xl font-semibold bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400"
          @input="moveNext(index)"
          @keydown.backspace="movePrevious(index)"
        />
      </div>

      <!-- Button -->
      <button
        @click="handleSubmit"
  :disabled="isLoading" 
        class="w-full mt-8 bg-blue-800 hover:bg-blue-900 text-white py-3 rounded-lg font-semibold transition
        flex justify-center items-center gap-2"
      >
        <span v-if="isLoading" class="flex items-center gap-2">
              <Loader size="20" class="animate-spin" />
              Processing...
            </span>
            <span v-else class="flex items-center gap-2 group">
              Verify & Register
              <MoveRight size="20" class="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
      </button>

      <!-- Divider -->
      <div class=" border-t-1 border-t-gray-300 my-8 "></div>

      <!-- Resend -->
      <div class="text-center text-[14px]">
        <span class="text-gray-500">Didn't receive the code?</span>

        <button
          class="ml-1 text-blue-600 font-medium hover:underline"
        >
          Resend Code (01:58)
        </button>
      </div>

      <!-- Back -->
      <div class="text-center flex items-center justify-center mt-5">
        <RouterLink
          to="/login"
          class="text-gray-600 hover:text-blue-700"
        >
          <span  class="text-center flex items-center gap-2 group">
            <MoveLeft size="20" class="transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Login
            </span>
        </RouterLink>
      </div>

      


    </div>

    <div class=" flex flex-row gap-3 mt-6">

      <p class="text-center flex justify-center gap-1 items-center text-[14px] text-gray-500 ">
        <ShieldCheck />
        Secure Encryption
      </p>
      <p class="text-center flex justify-center gap-1 items-center text-[14px] text-gray-500 ">
        <ShieldUser />
        Identity Protected
      </p>
    </div>
  </div>
</template>

<script setup>
import { Loader, MoveLeft, MoveRight, ShieldCheck, ShieldUser } from 'lucide-vue-next'
import { ref } from 'vue'

const isLoading = ref(false);

const otp = ref(['', '', '', '', '', ''])
const otpInputs = ref([])

const moveNext = (index) => {
  if (otp.value[index].length === 1 && index < 5) {
    otpInputs.value[index + 1]?.focus()
  }
}

const movePrevious = (index) => {
  if (!otp.value[index] && index > 0) {
    otpInputs.value[index - 1]?.focus()
  }
}

const verifyOtp = () => {
  const code = otp.value.join('')

  if (code.length !== 6) {
    alert('Please enter all 6 digits')
    return false
  }

  return true
}

const handleSubmit = async () => {

  // Verify OTP first
  const isValid = verifyOtp()

  if (!isValid) {
    return
  }

  isLoading.value = true

  try {

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    alert('Registration successful!')

  } catch (error) {

    alert('Something went wrong')

  } finally {

    isLoading.value = false

  }
}


</script>

<style scoped>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>