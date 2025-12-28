<script lang="ts" setup>
import { useThemeTransition, type ColorSchemeValue } from "sit-onyx";

const colorMode = useColorMode();

const colorScheme = computed({
  get: () => {
    return colorMode.preference === "system" ? "auto" : (colorMode.preference as ColorSchemeValue);
  },
  set: (newValue) => {
    colorMode.preference = newValue === "auto" ? "system" : newValue;
  },
});

useThemeTransition(colorScheme);
</script>

<template>
  <OnyxColorSchemeMenuItem v-model="colorScheme" />
</template>
