<script setup lang="ts">
import { type Ref, ref } from 'vue'
import { OnClickOutside } from '@vueuse/components'
import { searchNames } from '@/api'
import type { BoycottName } from '@/types'
import _debounce from 'lodash/debounce'

let input: Ref<string> = ref('')
let names: Ref<BoycottName[]> = ref([])
let showing = ref(false)
let pending = false
let hasInput = false

const search = _debounce(function (searchValue: string) {
  if (searchValue) {
    pending = true
    searchNames(searchValue).then((value) => {
      names.value = value
      pending = false
    })
  } else names.value = []
  hasInput = !!searchValue
}, 100)

function hide() {
  if (names.value.length) {
    console.log('hide')
    showing.value = false
  }
}

function show() {
  showing.value = true
}
</script>

<template>
  <OnClickOutside @trigger="hide">
    <div class="w-72 relative">
      <input
        type="text"
        placeholder="Type here"
        v-model="input"
        @keyup="(e) => search(e.target.value)"
        @focus="show"
        class="input input-bordered w-full"
      />
      <div v-if="showing" class="absolute bg-base-100 w-full flex flex-col gap-2 rounded-lg p-2">
        <a class="btn btn-ghost" v-for="name in names" :key="name" :href="`/boycott/${name.id}`">
          {{ name.name }}
        </a>
        <div v-if="hasInput && !pending && !names.length" class="mt-4 text-success text-center">
          No boycotted company found
        </div>
      </div>
    </div>
  </OnClickOutside>
</template>

<style scoped></style>
