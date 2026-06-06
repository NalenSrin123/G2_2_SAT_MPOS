<template>
  <div class=" bg-slate-100 flex items-center flex-col py-[60px] px-4" style="">
    <!-- Header -->
    <div class="text-center gap-[16px] flex flex-col mb-[24px]">
      <div class="w-[48px] h-[37px] bg-blue-800  rounded rounded-[8px] mx-auto flex items-center justify-center 
           text-white">
        <SquareChevronRight />
      </div>

      <h1 class=" text-[36px] font-bold text-blue-800">
        Nexus Terminal
      </h1>

      <p class="text-[14px] text-gray-500 ">
        Enterprise MPOS Ecosystem
      </p>
    </div>

    <div class="w-[440px] max-h-screen border border-gray-300 bg-white rounded-[12px] shadow-lg overflow-hidden">

      <!-- Form -->
      <div class="px-[32px] py-[40px]">
        <h2 class="text-[20px] font-semibold text-gray-800 mb-[32px]">
          Register Account
        </h2>

        <form class="space-y-[24px]">
          <!-- Name -->
          <div class="space-y-[8px]">
            <label class="block text-[14px] font-normal text-gray-600">
              Full Name
            </label>
            <div class="relative">
              <input type="text" placeholder="oeungrotha"
                class="w-full px-10 py-3 pr-10 border-2 border-gray-400 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400" />
              <User class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                size="20" />
            </div>
          </div>

          <!-- Email -->
          <div class="space-y-[8px]">
            <label class="block text-[14px] font-normal text-gray-600">
              Email Address
            </label>
            <div class="relative">
              <input type="email" placeholder="example@etec.com"
                class="w-full px-10 py-3 pr-10 border-2 border-gray-400 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400" />
              <Mail class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                size="20" />
            </div>
          </div>

          <!-- Password -->
          <div class="space-y-[8px]">
            <label class="block text-sm font-normal text-gray-600">
              Password
            </label>
            <div class="relative">
              <input :type="showPassword ? 'text' : 'password'"
                :placeholder="showPassword ? 'Must have at least 6 characters' : '••••••••'"
                class="w-full px-10 py-3 pr-10 border-2 border-gray-400 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400" />
              <LockKeyhole class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                size="20" />
              <button type="button"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                :aria-label="showPassword ? 'Hide password' : 'Show password'" @click="showPassword = !showPassword">
                <Eye v-if="showPassword" size="20" />
                <EyeOff v-else size="20" />
              </button>
            </div>

          </div>
          <!-- Register Button -->
          <button type="submit" @click="handleSubmit" :disabled="isLoading" class="w-full bg-blue-800 hover:bg-blue-900 text-white py-3 
            flex justify-center items-center gap-2
            rounded-lg font-normal transition duration-300
            disabled:opacity-70 disabled:cursor-not-allowed" :class="{ '': !isLoading }">
            <span v-if="isLoading" class="flex items-center gap-2">
              <Loader size="20" class="animate-spin" />
              Processing...
            </span>
            <span v-else class="flex items-center gap-2 group">
              Register
              <MoveRight size="20" class="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </button>
        </form>

        <!-- Divider -->
        <div class="relative my-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t-2 border-t-gray-300"></div>
          </div>

          <div class="relative flex justify-center text-xs uppercase">
            <span class="bg-white px-3 text-gray-400">
              Or Continue With
            </span>
          </div>
        </div>

        <!-- Google -->
        <div class="flex gap-2">
          <button class="flex justify-center items-center gap-2  w-full border border-gray-300 py-3  
           text-gray-700 rounded-lg bg-gray-100 hover:bg-gray-200 transition w">
            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 600 600">
              <path fill="#4285F4"
                d="M594 306.7c0-24.7-2-42.7-6.3-61.4H306v111.4h165.3A147 147 0 0 1 410 454l-.6 3.7 89.1 69 6.2.6C561.3 475 594 398 594 306.7" />
              <path fill="#34A853"
                d="M306 600c81 0 149-26.7 198.7-72.7L410 454c-25.3 17.7-59.3 30-104 30a181 181 0 0 1-170.7-124.7l-3.5.3-92.6 71.7-1.2 3.4A300 300 0 0 0 306 600" />
              <path fill="#FBBC05"
                d="M135.3 359.3a185 185 0 0 1-.3-118.6l-.2-4-93.7-72.8-3.1 1.4a300 300 0 0 0 0 269.4z" />
              <path fill="#EB4335"
                d="M306 116c56.3 0 94.3 24.3 116 44.7L506.7 78C454.7 29.7 387 0 306 0A300 300 0 0 0 38 165.3l97 75.4A181 181 0 0 1 306 116" />
            </svg>
            Google
          </button>
          <button class="flex justify-center items-center gap-2  w-full border border-gray-300 py-3  
           text-gray-700 rounded-lg bg-gray-100 hover:bg-gray-200 transition w">
            <FingerprintPattern />
            Biometrics
          </button>

        </div>

      </div>

    </div>
    <!-- Login Link -->
    <p class="text-center text-[14px] text-gray-500 mt-6">
      Already have an account?
      <a href="#" class="text-blue-700 font-medium hover:underline">
        Sign In
      </a>
    </p>
    <!-- Footer -->
    <div class=" py-4 text-center text-xs font-mono font-medium text-gray-400">
      <a href="#" class="hover:text-blue-700">Privacy Policy</a>
      <span class="mx-2">·</span>
      <a href="#" class="hover:text-blue-700">Terms of Service</a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';


const showPassword = ref(false);
const isLoading = ref(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  isLoading.value = true;

  // Simulate API call - replace with actual registration logic
  await new Promise(resolve => setTimeout(resolve, 1500));

  isLoading.value = false;
  // Add your registration logic here
};
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

<!-- npm install lucide-vue-next -->
