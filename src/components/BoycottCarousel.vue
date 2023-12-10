<script setup lang="ts">
import BoycottCard from '@/components/BoycottCard.vue'
import { useEntries } from '@/api/query'

const { data: entries, isLoading } = useEntries()
</script>

<template>
  <div
    v-if="!isLoading"
    class="carousel carousel-center rounded-box max-w-screen-lg w-screen space-x-4 flex-grow"
  >
    <BoycottCard v-for="entry in entries" :key="`card-${entry.id}`" :entry="entry" />
  </div>
  <div
    v-else
    class="carousel carousel-center rounded-box max-w-screen-lg w-screen space-x-4 flex-grow"
  >
    <div class="skeleton w-48 h-64 flex-shrink-0" v-for="idx in 5" :key="`skeleton-${idx}`"></div>
  </div>
</template>

<style scoped></style>
