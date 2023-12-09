<script setup lang="ts">
import { StreamBarcodeReader } from 'vue-barcode-reader'
import { type Ref, ref } from 'vue'
import { validate } from 'barcoder'
import { useRouter } from 'vue-router'

const loaded = ref(false)
const result: Ref<string | undefined> = ref()
const router = useRouter()

function decode(barcode: string) {
  if (validate(barcode)) {
    router.push(`/scan-result?barcode=${barcode}`)
  }
  result.value = barcode
}

function load() {
  console.log('loaded')
  loaded.value = true
}
</script>

<template>
  <div id="barcode" class="h-full">
    <div class="flex flex-col justify-end items-center h-1/3">
      <img src="/logo.png" class="h-32 shadow-xl rounded-box mb-4" alt="Palestine Flag" />
      <h1 class="text-3xl text-primary text-center font-extrabold">Boycott for Palestine</h1>
      <div class="divider" />
    </div>
    <div
      class="relative flex flex-col items-center h-2/3 w-full justify-between max-w-[36rem] mx-auto py-8"
    >
      <div v-if="!loaded" class="skeleton w-full h-full mb-16 flex-grow" />
      <StreamBarcodeReader
        class="w-fit h-fit max-h-full"
        v-if="!result"
        @decode="decode"
        @loaded="load"
      ></StreamBarcodeReader>
      <div v-else>Please Wait...</div>
      <a class="btn btn-outline btn-wide" href="/">Back</a>
    </div>
  </div>
</template>
