import type { AllowedComponentProps, VNodeProps } from "vue";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type VueProps<T extends abstract new (...args: any) => any> = Omit<
  InstanceType<T>["$props"],
  keyof (VNodeProps & AllowedComponentProps)
>;
