<script setup lang="ts">
import { type Ref, ref } from 'vue'
import { OnClickOutside } from '@vueuse/components'
import { searchNames } from '@/api'
import type { BoycottName } from '@/types'
import _debounce from 'lodash/debounce'

let input: Ref<string> = ref('')
let names: Ref<BoycottName[]> = ref([])
let state: Ref<{ showing: boolean; pending: boolean; empty: boolean }> = ref({
  showing: false,
  pending: false,
  empty: true
})

const search = _debounce(function (searchValue: string) {
  if (searchValue) {
    state.value.pending = true
    searchNames(searchValue).then((value) => {
      names.value = value
      state.value.pending = false
    })
  } else names.value = []
  state.value.empty = !searchValue
}, 50)

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
        placeholder="Type here"
        v-model="input"
        @keyup="(e) => search((e.target as HTMLInputElement).value)"
        @focus="show"
        class="input input-bordered w-full"
      />
      <div
        v-if="state.showing && (!state.pending || names.length)"
        class="relative bottom-[-0.25rem] h-0"
      >
        <div
          v-if="names.length"
          class="absolute bg-base-200 w-full flex flex-col gap-2 rounded-lg p-2"
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
