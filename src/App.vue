<script setup lang="ts">
import { RouterView } from 'vue-router'
import { themeChange } from 'theme-change'
import { onBeforeMount } from 'vue'

onBeforeMount(() => {
  themeChange(false)
})
</script>

<template>
  <RouterView />
</template>

<style></style>
