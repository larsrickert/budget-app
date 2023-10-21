<script lang="ts" setup>
import { UploadFilled } from "@element-plus/icons-vue";
import {
  ElIcon,
  ElTag,
  ElUpload,
  genFileId,
  type UploadFile,
  type UploadInstance,
  type UploadProps,
  type UploadRawFile,
  type UploadUserFile,
} from "element-plus";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const props = withDefaults(
  defineProps<{
    /**
     * List of file extensions, mime types or one of `audio/*` | `video/*` | `image/*` to allow uploading.
     * File extensions must include leading dot.
     */
    allowedFileTypes?: string[];
    disabled?: boolean;
    limit?: number;
    /** If `true` new selected files will override current selection. Otherwise, new selected files will be added to current selection. */
    replace?: boolean;
    /** max file size in megabyte */
    maxSize?: number;
  }>(),
  {
    modelValue: () => [],
    allowedFileTypes: () => [],
  },
);

const emit = defineEmits<{
  change: [value: File[]];
  exceedLimit: [exceededFiles: File[]];
  exceedFileSize: [file: File];
}>();

const { t } = useI18n();

const files = ref<UploadUserFile[]>([]);
const upload = ref<UploadInstance>();

watch(files, (newFiles) => {
  emit(
    "change",
    newFiles
      .filter((i): i is UploadUserFile & { raw: UploadRawFile } => !!i.raw)
      .map((i) => i.raw),
  );
});

const handleExceed: UploadProps["onExceed"] = (newFiles) => {
  const currentFileCount = props.replace ? 0 : files.value.length;

  const remainingLimit = props.limit
    ? props.limit - currentFileCount
    : undefined;
  const validFiles = newFiles.slice(0, remainingLimit).map((i) => {
    const file = i as UploadRawFile;
    file.uid = genFileId();
    return file;
  });

  if (props.replace) upload.value?.clearFiles();
  validFiles.forEach((i) => upload.value?.handleStart(i));

  if (newFiles.length !== validFiles.length) {
    emit("exceedLimit", newFiles.slice(remainingLimit));
  }
};

const isFileSizeAllowed = (file: File) => {
  if (!props.maxSize) return true;
  return file.size / 1024 / 1024 <= props.maxSize;
};

const fileSelectionStarted = ref(false);
const handleFileSelection = (file: UploadFile) => {
  if (fileSelectionStarted.value) return;
  fileSelectionStarted.value = true;

  if (props.replace) {
    upload.value?.clearFiles();
    if (file.raw) upload.value?.handleStart(file.raw);
  } else {
    // do not allow uploading same file (name) multiple times
    const isSelected = files.value.find((i) => i.name === file.name);
    if (isSelected) upload.value?.handleRemove(file);
  }

  if (file.raw && !isFileSizeAllowed(file.raw)) {
    upload.value?.handleRemove(file);
    emit("exceedFileSize", file.raw);
  }
};
watch(files, () => (fileSelectionStarted.value = false));
</script>

<template>
  <el-upload
    ref="upload"
    v-model:file-list="files"
    drag
    :accept="allowedFileTypes.join(',')"
    :auto-upload="false"
    :disabled="disabled"
    :limit="limit"
    :on-exceed="handleExceed"
    :on-change="handleFileSelection"
    :multiple="!limit || limit > 1"
  >
    <el-icon class="el-icon--upload"><UploadFilled /></el-icon>

    <div class="el-upload__text">
      {{ t("fileUpload.text") }}
      <em>{{ t("fileUpload.textClickToSelect") }}</em>
    </div>

    <template #tip>
      <div
        class="el-upload__tip"
        :class="{ 'el-upload__tip--has-files': files.length }"
      >
        <div v-if="maxSize">{{ t("fileUpload.maxFileSize", maxSize) }}</div>
        <div v-if="allowedFileTypes.length">
          {{ t("fileUpload.allowedFileTypes") }}:

          <div class="tags">
            <el-tag
              v-for="type of allowedFileTypes"
              :key="type"
              size="small"
              type="info"
            >
              {{ type }}
            </el-tag>
          </div>
        </div>
      </div>
    </template>
  </el-upload>
</template>

<style lang="scss" scoped>
.el-upload {
  &__tip {
    margin-top: var(--app-space-1);
    display: grid;
    gap: 4px;

    &--has-files {
      margin-bottom: var(--app-space-2);
    }
  }
}

.tags {
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--app-space-1);
}
</style>
