<script lang="ts" setup>
const runtimeConfig = useRuntimeConfig();
console.log("API host:", runtimeConfig.public.apiHost);
</script>

<template>
  <div>
    <NuxtWelcome />
  </div>
</template>

<style lang="scss" scoped></style>
