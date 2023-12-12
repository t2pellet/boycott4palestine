<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { watchEffect } from 'vue'
import { validate } from 'barcoder'
import { useFixBarcode } from '@/api/mutate'
import BarcodeAddForm from '@/components/BarcodeAddForm.vue'
import { useBarcode } from '@/api/query'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const route = useRoute()
const router = useRouter()
const barcode = route.query.barcode as string
const { data } = useBarcode(barcode)
const { mutate: fixBarcode, isSuccess, isPending } = useFixBarcode()

watchEffect(() => {
  if (!validate(barcode)) {
    router.replace('/')
  } else if (data.value?.company && data.value?.company.length) {
    router.replace(`/scan-result?barcode=${barcode}`)
  } else if (isSuccess.value) {
    router.replace(`/scan-result?barcode=${barcode}`)
  }
})

function submit(company: string, product: string) {
  fixBarcode({ company, product, barcode })
}
</script>

<template>
  <DefaultLayout id="boycott">
    <BarcodeAddForm
      :submit="submit"
      :loading="isPending"
      :show-product="false"
      class="mb-4"
      text="What brand is this?"
    />
    <RouterLink class="btn btn-outline btn-wide" to="/">Home</RouterLink>
  </DefaultLayout>
</template>

<style scoped></style>
