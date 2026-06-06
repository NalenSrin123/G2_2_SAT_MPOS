<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from './components/Sidebar.vue'

const route = useRoute()
const showSidebar = computed(() => route.meta.layout === 'dashboard')
</script>

<template>
  <div v-if="showSidebar" class="flex min-h-screen bg-[#f4f6f9] text-slate-900">
    <Sidebar />
    <main class="min-w-0 flex-1 overflow-x-hidden">
      <RouterView />
    </main>
  </div>

  <RouterView v-else />
</template>
