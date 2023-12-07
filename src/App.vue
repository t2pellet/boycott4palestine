<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <main class="relative mt-32 mb-4">
    <Suspense>
      <RouterView />
    </Suspense>
  </main>
</template>

<style scoped></style>
