<script setup lang="ts">
let company = ''
let product = ''

const props = defineProps<{
  submit: (company: string, product: string) => void
  loading: boolean
  showProduct: boolean
  text: string
}>()

function onSubmit() {
  props.submit(company, product)
}
</script>

<template>
  <form
    id="barcodeForm"
    @submit.prevent="onSubmit"
    class="relative flex flex-col items-center gap-4"
  >
    <span
      v-if="$props.loading"
      class="absolute h-full bg-base-200/20 loading loading-ring loading-lg"
    />
    <h2 class="text-lg font-bold text-secondary text-center">
      {{ $props.text }}
    </h2>
    <div class="form-control">
      <label for="barcodeCompany" class="label-text text-left">Company</label>
      <input
        id="barcodeCompany"
        class="input input-bordered"
        v-model="company"
        placeholder="Nestle"
        required
        minlength="4"
      />
    </div>
    <div class="form-control" v-if="$props.showProduct">
      <label for="barcodeProduct" class="label-text text-left">Product</label>
      <input
        id="barcodeProduct"
        class="input input-bordered"
        v-model="product"
        placeholder="KitKat"
        minlength="4"
      />
    </div>
    <button class="btn btn-primary btn-wide" type="submit">Submit</button>
  </form>
</template>
