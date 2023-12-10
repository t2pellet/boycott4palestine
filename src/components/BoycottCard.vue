<script setup lang="ts">
import type { BoycottEntry } from '@/types'

defineProps<{ entry: BoycottEntry }>()
</script>

<template>
  <RouterLink
    class="card bg-base-200/20 shadow-xl w-48 h-64 carousel-item focus:scale-105 hover:scale-105 transition-transform duration-300 transition-all"
    :to="`/boycott/${entry.id}`"
  >
    <div class="card-body text-center items-center pt-3 pb-4">
      <h2 class="card-title text-secondary">{{ entry.name }}</h2>
    </div>
    <figure class="rounded-box"><img :src="entry.logo" alt="Logo" /></figure>
  </RouterLink>
</template>
