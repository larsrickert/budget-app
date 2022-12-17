import { config } from "@/config";
import { computed, type Ref } from "vue";

export type FileFormatType = "crop-top" | "crop-bottom" | "fit";

export interface UseFileOptions {
  collection: string;
  record: Ref<string | undefined>;
  filename: Ref<string | undefined>;
  /** For available formats, see https://pocketbase.io/docs/files-handling#file-url */
  format?: {
    width: number;
    height: number;
    type?: FileFormatType;
  };
}

export const useFile = ({
  collection,
  record,
  filename,
  format,
}: UseFileOptions) => {
  const file = computed(() => {
    if (!record.value || !filename.value) return "";
    let fileUrl = `${config.api.host}/api/files/${collection}/${record.value}/${filename.value}`;
    if (format) {
      const formatQuery = format
        ? `${format.width}x${format.height}${
            format.type ? formatTypeMap[format.type] : ""
          }`
        : undefined;
      fileUrl += `?thumb=${formatQuery}`;
    }
    return fileUrl;
  });

  const formatTypeMap: Record<FileFormatType, string> = {
    fit: "f",
    "crop-bottom": "b",
    "crop-top": "t",
  };

  return { file };
};
