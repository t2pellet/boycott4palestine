<script setup lang="ts">
import { validate } from 'barcoder'

let barcode = ''

const props = defineProps<{
  submit: (barcode: string) => void
  text: string
}>()

function onSubmit() {
  if (validate(barcode)) {
    props.submit(barcode)
  }
}
</script>

<template>
  <form
    id="barcodeForm"
    @submit.prevent="onSubmit"
    class="relative flex flex-col items-center gap-4 bg-base-200/40 rounded-box p-4"
  >
    <h2 class="text-lg font-bold text-secondary text-center hidden sm:inline">
      {{ $props.text }}
    </h2>
    <div class="form-control">
      <label for="barcodeValue" class="label-text text-left">Barcode</label>
      <input
        id="barcodeValue"
        class="input input-bordered"
        v-model="barcode"
        placeholder="0194252097366"
        required
        minlength="4"
      />
    </div>
    <button class="btn btn-primary btn-wide" type="submit">Submit</button>
  </form>
</template>
