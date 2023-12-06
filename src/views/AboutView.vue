<script lang="ts">
export default {
  data() {
    return {
      data: {}
    }
  }
}
</script>
<script setup lang="ts">
import { onMounted, defineProps, ref, type Ref } from 'vue'
import { type BoycottEntry } from '@/types'

const props = defineProps({
  query: String
})
let data: Ref<BoycottEntry | undefined> = ref(undefined)

onMounted(() => {
  fetch(`https://palestine-bff.tenzin.live/boycott?name=${props.query}`).then((response) => {
    response.json().then((responseData) => {
      data.value = responseData[0]
    })
  })
})
</script>

<template>
  <main class="max-w-screen-xl mx-auto">
    <div class="flex flex-col items-center gap-6 text-center min-h-[28rem]">
      <img
        class="bg-neutral rounded-xl h-[128px]"
        v-if="data"
        v-bind:src="data.logo"
        width="128"
        alt="Company Logo"
      />
      <h1 class="text-primary font-extrabold text-3xl">{{ $props.query }}</h1>
      <div>
        <h2 class="text-secondary font-bold text-xl">Description</h2>
        <p v-if="data && data?.description">
          {{ data.description }}
        </p>
      </div>
      <div>
        <h2 class="text-secondary font-bold text-xl">Reason</h2>
        <p v-if="data && data?.reason">
          {{ data.reason }}
        </p>
      </div>
      <div>
        <h2 class="text-secondary font-bold text-xl">Proof</h2>
        <a class="link" v-if="data && data?.proof" v-bind:href="data.proof">
          {{ data.proof }}
        </a>
      </div>
    </div>
    <RouterLink to="/" class="mt-8 w-64 block mx-auto">
      <a class="btn btn-outline w-64 mx-auto">Back</a>
    </RouterLink>
  </main>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
