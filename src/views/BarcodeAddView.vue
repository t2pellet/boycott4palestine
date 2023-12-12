<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { watchEffect } from 'vue'
import { validate } from 'barcoder'
import { useAddBarcode } from '@/api/mutate'
import BarcodeAddForm from '@/components/BarcodeAddForm.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useCheckBarcode } from '@/api/query'

const route = useRoute()
const router = useRouter()
const barcode = route.query.barcode as string
const { mutate: addBarcode, isSuccess, isPending } = useAddBarcode()
const { data: checkData } = useCheckBarcode(barcode)

watchEffect(() => {
  if (!validate(barcode)) {
    router.replace('/')
  }
  if (checkData.value?.cached || isSuccess.value) {
    router.replace(`/scan-result?barcode=${barcode}`)
  }
})

function submit(company: string, product: string) {
  addBarcode({ company, product, barcode })
}
</script>

<template>
  <DefaultLayout id="boycott">
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
  </DefaultLayout>
</template>

<style scoped></style>
