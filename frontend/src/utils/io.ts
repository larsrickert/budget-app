import { ElMessage, type MessageOptions } from "element-plus";

export interface ShowToastOptions {
  message: string;
  type?: MessageOptions["type"];
  duration?: number;
}

export function showToast(options: ShowToastOptions) {
  ElMessage({
    message: options.message,
    type: options.type,
    showClose: true,
    grouping: true,
    duration: options.duration ?? 0,
  });
}
