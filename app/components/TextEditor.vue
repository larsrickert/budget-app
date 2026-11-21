<script lang="ts" setup>
import { OnyxStarterKit, OnyxTextEditor, type OnyxTextEditorProps } from "@sit-onyx/tiptap";
import type { Nullable } from "sit-onyx";

const props = defineProps<Pick<OnyxTextEditorProps, "label">>();

const value = defineModel<Nullable<string>>();

const extensions = [
  OnyxStarterKit.configure({
    heading: false,
    textAlign: false,
  }),
];
</script>

<template>
  <OnyxTextEditor v-model="value" :label="props.label" :extensions />
</template>

<style lang="scss" scoped>
:deep(.onyx-text-editor__native) {
  overflow-wrap: anywhere;
}
</style>
