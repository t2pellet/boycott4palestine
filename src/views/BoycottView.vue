<script setup lang="ts">
import { fetch } from '@/util/api'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = Number(route.params.id)
const boycottEntry = await fetch(id)
</script>

<template>
  <div id="boycott" class="h-full">
    <div id="logo" class="flex flex-col h-1/3 justify-end items-center">
      <img
        class="h-32 shadow-xl rounded-box mb-4"
        v-bind:src="boycottEntry.logo"
        alt="Company Logo"
      />
      <h1 class="text-primary font-extrabold text-3xl">{{ boycottEntry.name }}</h1>
      <div class="divider" />
    </div>
    <div id="content" class="flex flex-col items-center text-center h-2/3 gap-8 pt-8">
      <div id="reason">
        <h2 class="text-secondary font-bold text-xl mb-2">Reason</h2>
        <p class="text-sm max-w-screen-lg">
          {{ boycottEntry.reason }}
        </p>
      </div>
      <div id="actions" class="flex flex-col gap-4">
        <a class="btn btn-primary btn-wide" v-bind:href="boycottEntry.proof" target="_blank">
          Proof
        </a>
        <RouterLink id="back" to="/" class="btn btn-outline btn-wide">Back</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.center-children {
  display: flex;
  align-content: center;
  place-items: center;
}
</style>
