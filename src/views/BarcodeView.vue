<script setup lang="ts">
import { StreamBarcodeReader } from '@teckel/vue-barcode-reader'
import { ref } from 'vue'
import { validate } from 'barcoder'
import { useRouter } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BarcodeInputForm from '@/components/form/BarcodeInputForm.vue'

const loaded = ref(false)
const state = ref<'scan' | 'manual'>('scan')
const router = useRouter()

function decode(barcode: string) {
  if (validate(barcode)) {
    router.push(`/scan-result?barcode=${barcode}`)
  } else router.push('/')
}

function load() {
  loaded.value = true
}

function toggleState() {
  if (state.value == 'scan') state.value = 'manual'
  else state.value = 'scan'
}
</script>

<template>
  <DefaultLayout id="scan">
    <div
      class="sm:grid grid-cols-2 col-span-6 max-w-screen-lg w-full flex-grow pt-2 sm:pt-8 pb-16 mx-auto gap-8"
    >
      <div
        :class="state == 'manual' && 'hidden'"
        class="flex flex-col gap-3 self-center justify-center items-center relative w-full h-full sm:!flex"
      >
        <h2 class="text-lg text-secondary text-center hidden sm:inline font-bold">Scan barcode</h2>
        <div
          v-if="!loaded"
          class="skeleton mx-auto w-full h-full sm:max-h-[22rem] sm:max-w-lg rounded-box"
        />
        <div class="sm:max-w-lg rounded-box w-full overflow-hidden">
          <StreamBarcodeReader
            torch
            no-front-cameras
            class="w-fit h-fit"
            @decode="decode"
            @loaded="load"
          />
        </div>
      </div>
      <div
        :class="state == 'manual' && 'show-manual'"
        class="flex-col items-center justify-center gap-4 md:gap-8 self-center hidden sm:flex h-full"
      >
        <BarcodeInputForm :submit="decode" text="Input Manually" />
      </div>
    </div>
    <button
      class="absolute bottom-12 left-0 right-0 btn btn-outline btn-secondary btn-wide mx-auto sm:hidden max-w-full"
      @click="toggleState"
    >
      {{ state == 'scan' ? 'Manual Entry' : 'Scan Barcode' }}
    </button>
  </DefaultLayout>
</template>

<style>
.show-manual {
  display: flex !important;
}
</style>
