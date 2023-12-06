<script setup lang="ts">
import { type Ref } from 'vue'
import { ref } from 'vue'
import aboutView from '@/views/AboutView.vue'
import { OnClickOutside } from '@vueuse/components'

let input: Ref<string> = ref('')
let names: Ref<string[]> = ref([])

function search() {
  if (!input.value) {
    clear()
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

function clear() {
  names.value = []
}
</script>

<template>
  <OnClickOutside @trigger="clear">
    <div class="w-72 relative">
      <input
        type="text"
        placeholder="Type here"
        v-model="input"
        @keyup="search"
        @focus="search"
        class="input input-bordered w-full"
      />
      <div
        class="absolute bg-base-100 w-full flex flex-col gap-2 rounded-lg p-2"
        v-if="names.length"
      >
        <router-link class="btn btn-ghost" v-for="name in names" :key="name" :to="aboutView">
          {{ name }}
        </router-link>
      </div>
    </div>
  </OnClickOutside>
</template>

<style scoped></style>
