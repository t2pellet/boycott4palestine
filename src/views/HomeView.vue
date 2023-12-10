<script setup lang="ts">
import BoycottSearch from '@/components/BoycottSearch.vue'
import BoycottCarousel from '@/components/BoycottCarousel.vue'
</script>

<template>
  <div id="home" class="flex flex-col h-full gap-6">
    <div class="flex flex-col justify-end items-center h-1/3">
      <img src="/logo.png" class="h-32 shadow-xl rounded-box mb-4" alt="Palestine Flag" />
      <h1 class="text-3xl text-primary text-center font-extrabold">Boycott for Palestine</h1>
      <div class="divider w-full" />
    </div>
    <div class="relative flex-grow flex flex-col items-center gap-4">
      <div class="w-64 max-w-full">
        <h2 class="text-xl text-center font-bold mb-2">Check for Boycott</h2>
        <BoycottSearch />
      </div>
      <RouterLink class="btn btn-primary btn-wide max-w-full" to="/scan">
        Scan for Boycott
      </RouterLink>
      <div class="flex flex-col items-center flex-grow overflow-hidden">
        <h2 class="text-xl text-center font-bold mb-2">List of Shame</h2>
        <BoycottCarousel />
      </div>
    </div>
  </div>
</template>

<style></style>
