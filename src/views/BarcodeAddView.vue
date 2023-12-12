<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { watchEffect } from 'vue'
import { validate } from 'barcoder'
import { useAddBarcode } from '@/api/mutate'
import BarcodeAddForm from '@/components/BarcodeAddForm.vue'

const route = useRoute()
const router = useRouter()
const barcode = route.query.barcode as string
const { mutate: addBarcode, isSuccess, isPending } = useAddBarcode()

watchEffect(() => {
  if (!validate(barcode)) {
    router.replace('/')
  }
})
watchEffect(() => {
  if (isSuccess.value) {
    router.replace(`/scan-result?barcode=${barcode}`)
  }
})

function submit(company: string, product: string) {
  console.log('submit')
  addBarcode({ company, product, barcode })
}
</script>

<template>
  <div id="boycott" class="h-full">
    <div id="logo" class="flex flex-col h-1/3 justify-end items-center">
      <img
        class="h-32 shadow-xl rounded-box mb-4"
        src="/palestine-flag-wide.png"
        alt="Company Logo"
      />
      <h1 class="text-primary font-extrabold text-3xl">Boycott for Palestine</h1>
      <div class="divider" />
    </div>
    <div
      id="content"
      class="flex flex-col items-center justify-between text-center h-2/5 gap-8 pt-8"
    >
      <div>
        <BarcodeAddForm
          :submit="submit"
          :loading="isPending"
          :show-product="true"
          class="mb-4"
          text="We don't have that barcode. Let's fix that!"
        />
        <RouterLink class="btn btn-outline btn-wide" to="/">Home</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
