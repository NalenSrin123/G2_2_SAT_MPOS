<template>
  <span
    class="inline-flex px-3 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider"
    :class="badgeClass"
  >
    {{ status }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: String,
    required: true
  }
})

const badgeClass = computed(() => {
  switch (props.status) {
    case 'Active':
      return 'bg-[#dcfce7] text-[#166534]'

    case 'Low Stock':
      return 'bg-[#fee2e2] text-[#991b1b]'

    case 'Draft':
      return 'bg-gray-200 text-gray-600'

    default:
      return 'bg-gray-100 text-gray-600'
  }
})
</script>
