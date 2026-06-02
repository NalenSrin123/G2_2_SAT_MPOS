<template>
  <span
    class="px-3 py-1 rounded-full text-xs font-medium"
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
      return 'bg-green-100 text-green-600'

    case 'Low Stock':
      return 'bg-red-100 text-red-600'

    case 'Draft':
      return 'bg-gray-200 text-gray-600'

    default:
      return 'bg-gray-100 text-gray-600'
  }
})
</script>