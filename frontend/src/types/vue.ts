import type { Arrayable } from "@vueuse/core";
import type { FormItemRule } from "element-plus";
import type { AllowedComponentProps, VNodeProps } from "vue";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type VueProps<T extends abstract new (...args: any) => any> = Omit<
  InstanceType<T>["$props"],
  keyof (VNodeProps & AllowedComponentProps)
>;

export type FormValidation<T extends object> = Partial<{
  [K in keyof T]: Arrayable<FormItemRule>;
}>;
