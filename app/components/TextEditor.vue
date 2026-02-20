<script lang="ts" setup>
import { OnyxStarterKit, OnyxTextEditor, type OnyxTextEditorProps } from "@sit-onyx/tiptap";
import "@sit-onyx/tiptap/style.css";
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
  <OnyxTextEditor v-model="value" :label="props.label" :extensions :autosize="{ max: 6, min: 6 }" />
</template>

<style lang="scss" scoped>
:deep(.onyx-text-editor__native) {
  overflow-wrap: anywhere;
}
</style>
