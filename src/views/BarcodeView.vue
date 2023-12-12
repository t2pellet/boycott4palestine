<script setup lang="ts">
import { ImageBarcodeReader, StreamBarcodeReader } from 'vue-barcode-reader'
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
      class="sm:grid sm:grid-cols-2 max-w-screen-lg flex-grow sm:flex-grow-0 w-full sm:w-auto sm:h-fit pt-2 sm:pt-8 pb-16 mx-auto gap-8"
    >
      <div
        :class="state == 'manual' && 'hidden'"
        class="flex flex-col gap-3 items-center relative w-full h-full flex-grow sm:!flex"
      >
        <h2 class="text-lg text-secondary text-center hidden sm:inline font-bold">Scan barcode</h2>
        <div
          v-if="!loaded"
          class="skeleton mx-auto my-auto w-full h-full sm:max-h-[22rem] sm:max-w-lg rounded-box"
        />
        <div class="sm:max-w-lg rounded-box w-full overflow-hidden">
          <StreamBarcodeReader
            class="w-fit h-fit"
            @decode="decode"
            @loaded="load"
          ></StreamBarcodeReader>
        </div>
      </div>
      <div
        :class="state == 'manual' && 'show-manual'"
        class="flex-col items-center justify-between h-fit gap-4 md:gap-8 self-center hidden sm:flex"
      >
        <BarcodeInputForm :submit="decode" text="Input Manually" />
        <p class="font-bold text-lg">OR</p>
        <div class="flex flex-col justify-center items-center mx-auto gap-4">
          <h2 class="text-lg text-secondary font-bold">Upload Photo</h2>
          <div class="form-control">
            <label for="barcodeUpload" class="label-text">Barcode Image</label>
            <ImageBarcodeReader
              id="barcodeUpload"
              @decode="decode"
              class="file-input file-input-bordered file-input-primary max-w-full"
            />
          </div>
        </div>
      </div>
    </div>
    <button
      class="absolute bottom-12 left-0 right-0 btn btn-outline btn-secondary btn-wide mx-auto sm:hidden max-w-full"
      @click="toggleState"
    >
      {{ state == 'scan' ? 'Manual / File Entry' : 'Scan Barcode' }}
    </button>
  </DefaultLayout>
</template>

<style>
.show-manual {
  display: flex !important;
}
</style>
