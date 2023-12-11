<script setup lang="ts">
import { useEntry } from '@/api/query'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = Number(route.params.id)

const { data: boycottEntry } = useEntry(id)
</script>

<template>
  <div id="boycott" class="h-full">
    <div id="logo" class="flex flex-col h-1/3 justify-end items-center">
      <img
        class="h-32 shadow-xl rounded-box mb-4"
        v-if="boycottEntry"
        :src="boycottEntry.logo"
        alt="Company Logo"
      />
      <div class="skeleton w-32 h-32 mb-4" v-else />
      <h1 class="text-primary font-extrabold text-3xl" v-if="boycottEntry">
        {{ boycottEntry.name }}
      </h1>
      <div class="skeleton w-64 h-8" v-else />
      <div class="divider" />
    </div>
    <div
      id="content"
      class="flex flex-col items-center justify-between text-center h-2/5 gap-8 pt-8"
    >
      <div id="reason" class="w-full">
        <h2 class="text-secondary font-bold text-xl mb-2">Reason</h2>
        <p class="text-sm max-w-screen-lg mx-auto" v-if="boycottEntry">
          {{ boycottEntry.reason }}
        </p>
        <div
          v-else
          class="skeleton w-full max-w-screen-lg h-4 mb-2 mx-auto"
          v-for="idx in 5"
          :key="idx"
        ></div>
      </div>
      <div id="actions" class="flex flex-col gap-4">
        <a :href="boycottEntry?.proof" target="_blank">
          <button class="btn btn-primary btn-wide">Proof</button>
        </a>
        <RouterLink id="back" to="/" class="btn btn-outline btn-wide">Back</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
