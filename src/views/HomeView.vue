<script setup lang="ts">
import SearchCompanies from '../components/BoycottSearch.vue'
import { fetchAll } from '@/api'
import BoycottCard from '@/components/BoycottCard.vue'

const entries = await fetchAll()
</script>

<template>
  <div id="home" class="relative w-full h-full flex flex-col items-center justify-center">
    <div class="flex flex-col items-center">
      <img src="/logo.png" class="h-32 mb-4 shadow-xl rounded-box" alt="Palestine Flag" />
      <h1 class="text-3xl text-primary text-center font-extrabold">Boycott for Palestine</h1>
      <div class="divider" />
    </div>
    <div class="flex flex-col items-center justify-center gap-6 w-full">
      <div>
        <h2 class="text-lg mb-2 text-center font-bold">Search For a Company</h2>
        <SearchCompanies />
      </div>
      <div class="flex flex-col items-center w-full">
        <h2 class="text-lg mb-2 text-center font-bold">Browse Companies</h2>
        <div
          class="carousel carousel-center rounded-box w-screen max-w-screen-md items-center h-72 gap-3 px-2"
        >
          <BoycottCard v-for="entry in entries" :entry="entry" :key="entry.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
