<script setup lang="ts">
import BoycottCard from '@/components/BoycottCard.vue'
import BoycottSearch from '@/components/BoycottSearch.vue'
import BoycottCarousel from '@/components/BoycottCarousel.vue'
</script>

<template>
  <div id="home" class="h-full">
    <div class="flex flex-col justify-end items-center h-1/3">
      <img src="/logo.png" class="h-32 shadow-xl rounded-box mb-4" alt="Palestine Flag" />
      <h1 class="text-3xl text-primary text-center font-extrabold">Boycott for Palestine</h1>
      <div class="divider" />
    </div>
    <div class="flex flex-col items-center h-2/3 gap-8 pt-8">
      <div>
        <h2 class="text-xl text-center font-bold mb-2">Check for Boycott</h2>
        <BoycottSearch />
      </div>
      <div class="flex flex-col items-center flex-grow overflow-hidden">
        <h2 class="text-xl text-center font-bold mb-4">List of Shame</h2>
        <BoycottCarousel />
      </div>
    </div>
  </div>
</template>

<style></style>
