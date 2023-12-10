<script setup lang="ts">
import { useBarcode } from '@/api/query'
import { useRoute, useRouter } from 'vue-router'
import { watchEffect } from 'vue'
import BarcodeCard from '@/components/BarcodeCard.vue'

const route = useRoute()
const router = useRouter()
const barcode = route.query.barcode as string

const { data: barcodeData, isError, error } = useBarcode(barcode)

watchEffect(() => {
  if (isError.value) {
    const err = error.value.toJSON()
    console.log('err: ' + err.status)
    if (err.status === 404) {
      console.log('add')
      router.replace(`/add-scan?barcode=${barcode}`)
    } else router.replace('/')
  } else if (barcodeData.value && !barcodeData.value.company.length) {
    router.replace(`/fix-scan?barcode=${barcode}`)
  }
})
</script>

<template>
  <div id="boycott" class="h-full">
    <div id="logo" class="flex flex-col h-1/3 justify-end items-center">
      <img
        class="h-32 shadow-xl rounded-box mb-4"
        v-if="barcodeData"
        src="/logo.png"
        alt="Company Logo"
      />
      <div class="skeleton w-32 h-32 mb-4" v-else />
      <h1 class="text-primary font-extrabold text-3xl" v-if="barcodeData">Boycott for Palestine</h1>
      <div class="skeleton w-64 h-8" v-else />
      <div class="divider" />
    </div>
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
  </div>
</template>

<style scoped></style>
