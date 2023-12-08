<script setup lang="ts">
import { fetchBoycottEntry } from '@/api'
import { useRoute } from 'vue-router'

const route = useRoute()
const boycottEntry = await fetchBoycottEntry(Number(route.params.id))
</script>

<template>
  <div class="h-full grid place-items-center max-w-screen-lg mx-auto">
    <div class="flex flex-col items-center gap-6 text-center h-96">
      <img
        class="bg-base-200 rounded-box h-[128px]"
        v-bind:src="boycottEntry.logo"
        width="128"
        alt="Company Logo"
      />
      <h1 class="text-primary font-extrabold text-3xl">{{ boycottEntry.name }}</h1>
      <div v-if="boycottEntry.description">
        <h2 class="text-secondary font-bold text-xl">Description</h2>
        <p class="text-sm">
          {{ boycottEntry.description }}
        </p>
      </div>
      <div>
        <h2 class="text-secondary font-bold text-xl">Reason</h2>
        <p class="text-sm">
          {{ boycottEntry.reason }}
        </p>
      </div>
      <div>
        <h2 class="text-secondary font-bold text-xl">Proof</h2>
        <a class="link text-sm" v-bind:href="boycottEntry.proof">
          {{ boycottEntry.proof }}
        </a>
      </div>
    </div>
    <RouterLink to="/" class="mt-8 w-64 block mx-auto">
      <a class="btn btn-outline w-64 mx-auto">Back</a>
    </RouterLink>
  </div>
</template>
