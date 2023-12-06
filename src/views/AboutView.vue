<script lang="ts">
export default {
  props: {
    query: String
  }
}
</script>

<template>
  <main>
    <h1>{{ $props.query }}</h1>
    }
  </main>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
