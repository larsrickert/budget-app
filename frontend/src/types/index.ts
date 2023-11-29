import type { ElButton } from "element-plus";
import type { InjectionKey, Ref } from "vue";
import type { VueProps } from "./vue";

export const provideIsDrawerOpenSymbol: InjectionKey<Ref<boolean>> = Symbol();

export type Icon = VueProps<typeof ElButton>["icon"];
