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
  } else router.push('/')
  result.value = barcode
}

function load() {
  loaded.value = true
}
</script>

<template>
  <div id="barcode" class="flex flex-col py-8 items-center h-full">
    <img src="/logo.png" class="h-32 shadow-xl rounded-box mb-4" alt="Palestine Flag" />
    <div class="hidden sm:inline-block w-full">
      <h1 class="text-3xl text-primary text-center font-extrabold">Boycott for Palestine</h1>
      <div class="divider w-full" />
    </div>
    <div v-if="!loaded" class="skeleton w-full h-full sm:max-h-[64rem] sm:max-w-lg rounded-box" />
    <div class="sm:max-w-lg rounded-box w-full mb-16 overflow-hidden">
      <StreamBarcodeReader
        class="w-fit h-fit"
        @decode="decode"
        @loaded="load"
      ></StreamBarcodeReader>
    </div>
    <RouterLink class="absolute bottom-8 btn btn-outline btn-wide" to="/">Back</RouterLink>
  </div>
</template>
