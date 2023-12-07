<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <main class="relative h-full px-4 md:px-20 py-8">
    <Suspense>
      <RouterView />
    </Suspense>
  </main>
</template>

<style scoped></style>
