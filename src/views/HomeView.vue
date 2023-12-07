<script setup lang="ts">
import SearchCompanies from '../components/BoycottSearch.vue'
</script>

<template>
  <div id="home" class="h-full grid place-items-center">
    <div class="flex flex-col items-center h-[36rem] justify-between">
      <div class="h-48 flex flex-col items-center">
        <img src="/logo.png" class="h-32 mb-4" alt="Palestine Flag" />
        <h1 class="text-3xl text-primary text-center font-extrabold">Boycott for Palestine</h1>
        <div class="divider" />
      </div>
      <div class="h-40 grid place-items-center">
        <div>
          <h2 class="text-lg text-secondary mb-2 text-center font-bold">Search For a Company</h2>
          <SearchCompanies />
        </div>
      </div>
      <div class="h-48 bg-primary" />
    </div>
  </div>
</template>

<style></style>
