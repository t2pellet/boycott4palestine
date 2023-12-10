<script setup lang="ts">
import { useBarcode } from '@/api/query'
import { useRoute, useRouter } from 'vue-router'
import { watchEffect } from 'vue'

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
  }
})
</script>

<template>
  <div id="boycott" class="h-full">
    <div id="logo" class="flex flex-col h-1/3 justify-end items-center">
      <img
        class="h-32 shadow-xl rounded-box mb-4"
        v-if="barcodeData"
        :src="barcodeData.boycott ? barcodeData.logo : '/logo.png'"
        alt="Company Logo"
      />
      <div class="skeleton w-32 h-32 mb-4" v-else />
      <h1 class="text-primary font-extrabold text-3xl" v-if="barcodeData">
        {{ barcodeData.company || barcodeData.product }}
      </h1>
      <div class="skeleton w-64 h-8" v-else />
      <div class="divider" />
    </div>
    <div
      id="content"
      class="flex flex-col items-center justify-between text-center h-2/5 gap-8 pt-8"
    >
      <div id="reason" class="w-full">
        <h2
          class="font-bold text-xl mx-auto mb-8"
          :class="barcodeData.boycott ? 'text-secondary' : 'text-success'"
          v-if="barcodeData"
        >
          {{ barcodeData.boycott ? 'Boycotted' : 'Not Boycotted' }}
        </h2>
        <div v-else class="skeleton w-full max-w-screen-lg h-8 mb-8 mx-auto"></div>
        <p class="text-sm max-w-screen-lg mx-auto" v-if="barcodeData">
          {{ barcodeData.boycott ? barcodeData.reason : '' }}
        </p>
        <div
          v-else
          class="skeleton w-full max-w-screen-lg h-4 mb-2 mx-auto"
          v-for="idx in 5"
          :key="idx"
        ></div>
      </div>
      <div id="actions" class="flex flex-col gap-4">
        <a v-if="barcodeData?.boycott" :href="barcodeData.proof" target="_blank">
          <button class="btn btn-primary btn-wide">Proof</button>
        </a>
        <div v-else-if="!barcodeData" class="skeleton w-64 h-12" />
        <RouterLink id="scan" to="/scan" class="btn btn-primary btn-wide">Scan More</RouterLink>
        <RouterLink id="home" to="/" class="btn btn-outline btn-wide">Home</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
