<script setup lang="ts">
import { type Ref, ref } from 'vue'
import { OnClickOutside } from '@vueuse/components'
import type { BoycottName } from '@/types'
import { search } from '@/util/filter'

const { entries } = defineProps<{ entries: BoycottName[] }>()

let input: Ref<string> = ref('')
let names: Ref<BoycottName[]> = ref([])
let state: Ref<{ showing: boolean; pending: boolean; empty: boolean }> = ref({
  showing: false,
  pending: false,
  empty: true
})

function updateSearch(e: Event) {
  const value = (e.target as HTMLInputElement).value
  if (!value) {
    names.value = []
    state.value.empty = true
    return
  }
  const result = search(value, entries)
  names.value = result
  state.value.empty = !result.length
}

function hide() {
  if (state.value.empty || names.value.length) {
    state.value.showing = false
  }
}

function show() {
  state.value.showing = true
}
</script>

<template>
  <OnClickOutside @trigger="hide">
    <div class="w-72 relative">
      <input
        type="text"
        placeholder="Company name"
        v-model="input"
        @keyup="updateSearch"
        @focus="show"
        class="input input-bordered w-full"
      />
      <div
        v-if="state.showing && (!state.pending || names.length)"
        class="relative bottom-[-0.25rem] h-0"
      >
        <div
          v-if="!state.empty"
          class="absolute bg-base-200 w-full flex flex-col gap-2 rounded-lg p-2 z-20"
        >
          <a
            class="btn btn-ghost min-h-[2rem] h-8"
            v-for="name in names"
            :key="name.name"
            :href="`/boycott/${name.id}`"
          >
            {{ name.name }}
          </a>
          <div
            v-if="!state.empty && !state.pending && !names.length"
            class="text-success text-center"
          >
            No boycotted company found
          </div>
        </div>
      </div>
    </div>
  </OnClickOutside>
</template>

<style scoped></style>
