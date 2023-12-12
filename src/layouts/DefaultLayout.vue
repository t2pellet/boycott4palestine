<script setup lang="ts">
import PalestineAnchor from '@/components/nav/PalestineAnchor.vue'
import BoycottSearch from '@/components/BoycottSearch.vue'
import { Menu2Icon } from 'vue-tabler-icons'
</script>
<template>
  <main class="drawer h-full">
    <input id="drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
      <div
        class="navbar sticky justify-between w-screen top-0 z-30 px-4 py-2 shadow-md bg-base-100"
      >
        <label for="drawer" class="absolute btn btn-square btn-ghost md:hidden">
          <Menu2Icon />
        </label>
        <div class="gap-8 mx-auto md:mx-0">
          <PalestineAnchor />
          <BoycottSearch class="hidden md:flex w-72" />
        </div>
        <ul class="menu menu-horizontal px-1 text-primary flex-nowrap hidden md:inline-flex">
          <li>
            <RouterLink to="/scan">Scan Barcode</RouterLink>
          </li>
          <li>
            <a href="https://samidoun.net/category/take-action/" target="_blank">Take Action</a>
          </li>
          <li>
            <a href="https://support.anera.org/a/donate" target="_blank">Donate</a>
          </li>
        </ul>
      </div>
      <div class="flex flex-col h-full gap-8 px-4 pt-4 pb-12">
        <slot />
      </div>
    </div>
    <div class="drawer-side z-50">
      <label for="drawer" class="drawer-overlay"> </label>
      <ul
        class="menu menu-md gap-2 items-center min-h-full w-2/3 bg-base-100 px-1 text-primary flex-nowrap"
      >
        <PalestineAnchor class="mb-4" />
        <li class="drawer-item">
          <RouterLink to="/scan">Scan Barcode</RouterLink>
        </li>
        <li class="drawer-item">
          <a
            href="https://remix.aljazeera.com/aje/PalestineRemix/timeline_main.html"
            target="_blank"
            >Learn More</a
          >
        </li>
        <li class="drawer-item">
          <a href="https://samidoun.net/category/take-action/" target="_blank">Take Action</a>
        </li>
        <li class="drawer-item">
          <a href="https://support.anera.org/a/donate" target="_blank">Donate</a>
        </li>
      </ul>
    </div>
  </main>
</template>

<style scoped>
.drawer-item {
  > * {
    width: 100%;
    height: 3rem;
    align-content: center;
    place-content: center;
  }
  align-content: center;
  width: 100%;
}
</style>
