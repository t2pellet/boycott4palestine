<script setup lang="ts">
import { type Ref, ref } from 'vue'
import { OnClickOutside } from '@vueuse/components'
import type { BoycottName } from '@/types'
import { search } from '@/util/filter'
import { useRouter } from 'vue-router'
import { useNames } from '@/api'

const router = useRouter()

const { data: entries } = useNames()

let input: Ref<string> = ref('')
let names: Ref<BoycottName[]> = ref([])
let state: Ref<{ showing: boolean; pending: boolean; empty: boolean }> = ref({
  showing: false,
  pending: false,
  empty: true
})

function submit() {
  if (names.value.length) {
    const result = names.value[0].id
    router.push(`/boycott/${result}`)
  }
}

function updateSearch(e: Event) {
  const value = (e.target as HTMLInputElement).value
  if (!value) {
    names.value = []
    state.value.empty = true
    return
  } else state.value.empty = false
  names.value = search(value, entries.value || [])
  console.log(JSON.stringify(state.value))
  console.log(names.value)
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
    <div class="w-full relative">
      <input
        type="text"
        placeholder="Company name"
        v-model="input"
        @keyup.enter="submit"
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
