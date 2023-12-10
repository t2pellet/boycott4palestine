<script setup lang="ts">
import type { BoycottBarcode } from '@/types'

defineProps<{ entry: BoycottBarcode }>()
</script>

<template>
  <component
    :is="entry.boycott ? 'RouterLink' : 'div'"
    class="card bg-base-200/20 shadow-xl w-48 h-64 p-3 carousel-item focus:scale-105 hover:scale-105 transition-transform duration-300"
    :to="entry.boycott && `/boycott/${entry.id}`"
  >
    <div class="card-body text-center py-4">
      <h2 class="card-title mx-auto">{{ entry.company }}</h2>
      <p :class="entry.boycott ? 'text-primary' : 'text-success'" class="font-bold">
        {{ entry.boycott ? 'Boycotted' : 'Not Boycotted' }}
      </p>
    </div>
    <figure class="rounded-box w-fit max-w-[10.5rem] mx-auto">
      <img :src="entry.logo" alt="Logo" />
    </figure>
  </component>
</template>
