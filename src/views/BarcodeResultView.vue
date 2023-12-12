<script setup lang="ts">
import { useBarcode } from '@/api/query'
import { useRoute, useRouter } from 'vue-router'
import { watchEffect } from 'vue'
import BarcodeCard from '@/components/BarcodeCard.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const route = useRoute()
const router = useRouter()
const barcode = route.query.barcode as string

const { data: barcodeData, isError, error } = useBarcode(barcode)

watchEffect(() => {
  if (isError.value) {
    const err = error.value.toJSON()
    if (err.status === 404) {
      router.replace(`/add-scan?barcode=${barcode}`)
    } else router.replace('/')
  } else if (barcodeData.value && !barcodeData.value.company.length) {
    router.replace(`/fix-scan?barcode=${barcode}`)
  }
})
</script>

<template>
  <DefaultLayout id="boycott">
    <div
      id="content"
      class="flex flex-col items-center justify-between text-center h-2/5 gap-8 pt-8"
    >
      <BarcodeCard v-if="barcodeData" :entry="barcodeData" />
      <div class="skeleton w-48 min-h-[16rem]" v-else />
      <div id="actions" class="flex flex-col gap-4">
        <RouterLink id="scan" to="/scan" class="btn btn-primary btn-wide">Scan More</RouterLink>
        <RouterLink id="home" to="/" class="btn btn-outline btn-wide">Home</RouterLink>
      </div>
    </div>
  </DefaultLayout>
</template>

<style scoped></style>
