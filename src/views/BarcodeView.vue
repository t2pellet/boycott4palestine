<script setup lang="ts">
import { StreamBarcodeReader } from 'vue-barcode-reader'
import { type Ref, ref } from 'vue'
import { validate } from 'barcoder'
import { useRouter } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

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
  <DefaultLayout id="scan">
    <div class="flex flex-col justify-center items-center relative w-full flex-grow">
      <div
        v-if="!loaded"
        class="skeleton mx-auto my-auto w-full h-full sm:max-h-[22rem] sm:max-w-lg rounded-box"
      />
      <div class="sm:max-w-lg rounded-box w-full mb-16 overflow-hidden">
        <StreamBarcodeReader
          class="w-fit h-fit"
          @decode="decode"
          @loaded="load"
        ></StreamBarcodeReader>
      </div>
    </div>
    <RouterLink to="/" class="absolute bottom-8 btn btn-outline btn-wide mx-auto left-0 right-0"
      >Back</RouterLink
    >
  </DefaultLayout>
</template>
