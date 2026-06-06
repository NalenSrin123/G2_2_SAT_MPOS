<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200 px-4 py-2 ">
    <!-- CARD -->
    <div class="w-full max-w-[500px] bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
      <!-- Top from -->
      <div class="px-6  text-center">
        <!-- Logo -->
      <div class="md:my-3 my-1 w-14 h-14 bg-sky-600 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto rounded-full sm:rounded-full overflow-hidden flex items-center justify-center">


      </div>

        <!-- TITLE -->
        <div>
          <h1 class="text-xl sm:text-xl font-bold text-blue-900 my-1">
            Nexus Terminal
          </h1>
          <p class="text-gray-500 mt-1  text-sm tracking-wide">
            Enterprise MPOS Ecosystem
          </p>
        </div>

      </div>

      <!-- FORM -->
      <div class="p-4  ">
        <div class="bg-white border border-gray-200 rounded-2xl sm:rounded-3xl px-6   md:py-4 py-3 shadow-sm">
        <!-- sign in -->
          <h2 class="text-xl sm:text-2xl font-bold text-gray-800 my-2 ">
            Sign In
          </h2>

          <form @submit.prevent="handleLogin">

            <!-- Input email with error -->
            <div class="mb-2">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <!-- Input email  -->
              <div
                class="flex  items-center gap-3 border rounded-xl px-4 py-2 sm:py-2 transition-all duration-300"
                :class="
                  emailError
                    ? 'border-red-500 focus-within:ring-1 focus-within:ring-red-400'
                    : 'border-gray-300 focus-within:ring-1 focus-within:ring-black'
                "
              >
                <!-- Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-envelope text-gray-400" viewBox="0 0 16 16">
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2
                        2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1
                        0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8
                        9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1
                        11.105l4.708-2.897L1 5.383z"/>
                </svg>

                <!-- INPUT -->
                <input
                  v-model="email"
                  type="email"
                  placeholder="name@company.com"
                  class="w-full outline-none bg-transparent text-gray-700 placeholder:text-gray-400 text-sm sm:text-base"
                />
              </div>
              <!-- ERROR -->
              <p
                v-if="emailError"
                class="text-red-500 text-sm mt-2 font-medium"
              >
                {{ emailError }}
              </p>
            </div>

            <!-- Input password  error and show password-->
            <div class="mb-2">
              <div class="flex justify-between items-center mb-1">
                <label class="text-sm font-semibold text-gray-700">
                  Password
                </label>  
                <!-- Forgot password-->
                <router-link
                  to="/forgot-password"
                  class="text-sm text-blue-700 hover:underline font-medium"
                >
                  Forgot Password?
                </router-link>
              </div>
              <div
                class="flex items-center gap-3 border rounded-xl px-4 py-2 sm:py-2 transition-all duration-300"
                :class="
                  passwordError
                    ? 'border-red-500 focus-within:ring-1 focus-within:ring-red-400'
                    : 'border-gray-300 focus-within:ring-1 focus-within:ring-black'
                "
              >
                <!-- key icon-->
                <svg
                  class="text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="7" cy="12" r="3"></circle>
                  <path d="M10 12h10"></path>
                  <path d="M16 12v3"></path>
                  <path d="M19 12v2"></path>
                </svg>

                <!-- Input password-->
                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="••••••••"
                  class="w-full outline-none bg-transparent text-gray-700 text-sm sm:text-base"
                />

                <!-- Eye -->
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                >
                  <!-- Open eye -->
                  <svg
                    v-if="!showPassword"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>

                  <!-- Close eye -->
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-7-9-7a17.284 17.284 0 014.168-5.271M9.88 9.88a3 3 0 104.24 4.24"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.1 6.1L3 3m18 18l-3.1-3.1"
                    />
                  </svg>
                </button>
              </div>

              <!-- Error -->
              <p
                v-if="passwordError"
                class="text-red-500 text-sm mt-2 font-medium"
              >
                {{ passwordError }}
              </p>
            </div>

            <!-- Remember -->
            <div class="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                class="w-4 h-4 rounded border-gray-300 text-blue-600"
              />

              <span class="text-sm text-gray-600">
                Remember this device
              </span>
              
            </div>
            <!-- Button sign in -->
            <button
              type="submit"
              class="group relative overflow-hidden flex items-center justify-center gap-2  w-full
                    bg-blue-800
                    text-white py-2 sm:py-2 rounded-md
                    text-base sm:text-md font-semibold tracking-wide"
            >

              <!-- Glow -->
              <span
                class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition duration-300"
              ></span>

              <!-- Text -->
              <span class="relative z-10 flex items-center gap-2">
                Sign In
              </span>

              <!-- Arrow -->
              <span
                class="relative z-10 text-xl transition-transform duration-300 group-hover:translate-x-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" fill="currentColor" class="bi bi-arrow-bar-right" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8m-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5"/>
                </svg>
              </span>
            </button>

          </form>

          <!-- DIVIDER -->
          <div class="flex items-center gap-4 my-2 ">
            <div class="flex-1 h-px bg-gray-300"></div>

            <span class="text-xs tracking-[2px] my-3 uppercase text-gray-400 font-semibold text-center">
              Or Continue With
            </span>

            <div class="flex-1 h-px bg-gray-300"></div>
          </div>

          <!-- Button social -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">

            <!-- Google -->
            <button
              class="border border-gray-300 rounded-xl py-2 flex items-center justify-center gap-2 hover:bg-gray-50 transition"
            >
              <img
                src="@/assets/btngoogle.png"
                alt=""
                class="w-5 h-5"
              />

              <span class="font-medium text-gray-700">
                Google
              </span>
            </button>

            <!-- Biometrics -->
            <button
              class="border border-gray-300 rounded-xl py-2 flex items-center justify-center gap-2 hover:bg-gray-50 transition"
            >
              <img src="@/assets/btnbio.png" class="w-5 h-5" alt="">

              <span class="font-medium text-gray-700">
                Biometrics
              </span>
            </button>
          </div>
        </div>

        <!-- Footer from -->
        <div class="text-center mt-2">
          <p class="text-gray-600 text-sm sm:text-base">
            Don't have an account?

            <a href="#" class="text-blue-700 font-semibold hover:underline">
              Create an account
            </a>
          </p>

          <div class="md:mt-2 flex  flex-wrap justify-center gap-4 sm:gap-6 text-sm text-gray-400">
            <a href="#" class="hover:text-blue-600">
              Privacy Policy
            </a>

            <a href="#" class="hover:text-blue-600">
              Terms of Service
            </a>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const showPassword = ref(false);

const email = ref("");
const password = ref("");

const emailError = ref("");
const passwordError = ref("");

const handleLogin = () => {

  // reset
  emailError.value = "";
  passwordError.value = "";

  // email validation 
  if (!email.value.trim()) {
    emailError.value = "Email is required";
  }

  // password validation
  if (!password.value.trim()) {
    passwordError.value = "Password is required";
  }

  // stop if error
  if (emailError.value || passwordError.value) {
    return;
  }

  // success
  console.log("Login Success");
};
</script>

<style scoped>
input::placeholder {
  font-weight: 500;
}
</style>