<script setup lang="ts">
import { type Ref, ref } from 'vue'
import { OnClickOutside } from '@vueuse/components'
import { searchNames } from '@/api'
import type { BoycottName } from '@/types'

let input: Ref<string> = ref('')
let names: Ref<BoycottName[]> = ref([])
let pending = false
let hasInput = false
let showing = false

async function search(event: Event) {
  pending = true
  const value = (event.currentTarget as HTMLInputElement).value
  if (value) {
    names.value = await searchNames(value)
  } else names.value = []
  hasInput = value
  pending = false
}

function hide() {
  if (!input.value || names.value.length) {
    showing = false
  }
}

function show() {
  showing = true
}
</script>

<template>
  <OnClickOutside @trigger="hide">
    <div class="w-72 relative">
      <input
        type="text"
        placeholder="Type here"
        v-model="input"
        @keyup="search"
        @focus="show"
        class="input input-bordered w-full"
      />
      <div class="absolute bg-base-100 w-full flex flex-col gap-2 rounded-lg p-2" v-if="showing">
        <a class="btn btn-ghost" v-for="name in names" :key="name" :href="`/boycott/${name.id}`">
          {{ name.name }}
        </a>
        <div v-if="hasInput && !pending && !names.length" class="mt-4 text-success text-center">
          No boycotted company found
        </div>
        <p v-if="pending">Pending</p>
      </div>
    </div>
  </OnClickOutside>
</template>

<style scoped></style>
