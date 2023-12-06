<script setup lang="ts">
import { type Ref, ref } from 'vue'
import { OnClickOutside } from '@vueuse/components'
import { useRouter } from 'vue-router'

let input: Ref<string> = ref('')
let showing: Ref<boolean> = ref(false)
let names: Ref<string[]> = ref([])
const router = useRouter()

function search() {
  if (!input.value) {
    names.value = []
    return
  }
  const url = `https://palestine-bff.tenzin.live/boycott/names${
    input.value ? `?name=${input.value}` : ''
  }`
  fetch(url, {
    method: 'GET'
  })
    .then((response) => {
      response.json().then((data) => {
        names.value = data
      })
    })
    .catch((err) => console.error(err))
}

function goTo(query: string) {
  console.log(JSON.stringify(query))
  router.push({
    name: 'about',
    query: {
      query
    }
  })
}

function hide() {
  if (!input.value || names.value.length) {
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
        @keyup="search"
        @focus="show"
        class="input input-bordered w-full"
      />
      <div class="absolute bg-base-100 w-full flex flex-col gap-2 rounded-lg p-2" v-if="showing">
        <a class="btn btn-ghost" v-for="name in names" :key="name" @click="() => goTo(name)">
          {{ name }}
        </a>
        <div v-if="input && !names.length" class="mt-4 text-success text-center">
          No boycotted company found
        </div>
      </div>
    </div>
  </OnClickOutside>
</template>

<style scoped></style>
