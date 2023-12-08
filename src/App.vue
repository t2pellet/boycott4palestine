<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <main class="relative w-full h-full md:px-8 sm:px-4 px-3">
    <Suspense>
      <RouterView />
    </Suspense>
  </main>
</template>

<style></style>
