<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { watchEffect } from 'vue'
import { validate } from 'barcoder'
import { useFixBarcode } from '@/api/mutate'
import BarcodeAddForm from '@/components/BarcodeAddForm.vue'
import { useBarcode } from '@/api/query'

const route = useRoute()
const router = useRouter()
const barcode = route.query.barcode as string
const { data } = useBarcode(barcode)
const { mutate: fixBarcode, isSuccess, isPending } = useFixBarcode()

watchEffect(() => {
  if (!validate(barcode)) {
    router.replace('/')
  } else if (data.value?.company != null && data.value?.company.length > 0) {
    console.log('company: ' + data.value.company)
    router.replace(`/scan-result?barcode=${barcode}`)
  }
})
watchEffect(() => {
  if (isSuccess.value) {
    console.log('success')
    router.replace(`/scan-result?barcode=${barcode}`)
  }
})

function submit(company: string, product: string) {
  console.log('submit')
  fixBarcode({ company, product, barcode })
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
      <h1 v-if="data" class="text-primary font-extrabold text-2xl">{{ data.product }}</h1>
      <div class="skeleton w-64 h-8" v-else />
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
          :show-product="false"
          class="mb-4"
          text="What brand is this?"
        />
        <RouterLink class="btn btn-outline btn-wide" to="/">Home</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
