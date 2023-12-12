<script setup lang="ts">
import BoycottSearch from '@/components/BoycottSearch.vue'
import BoycottCarousel from '@/components/BoycottCarousel.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BoycottHero from '@/components/BoycottHero.vue'
</script>

<template>
  <DefaultLayout id="home">
    <BoycottSearch id="search" class="md:hidden w-96 max-w-full mx-auto" />
    <BoycottHero link="#list" label="Get Boycotting" class="mx-auto" />
    <div id="list" class="flex flex-col items-center flex-grow">
      <h2 class="text-xl text-center font-bold mb-2">Worst Offenders</h2>
      <BoycottCarousel />
      <a
        class="text-secondary text-sm link"
        href="https://www.ihrc.org.uk/boycott-genocide/"
        target="_blank"
        >Who decides this?</a
      >
    </div>
  </DefaultLayout>
</template>
