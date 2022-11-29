import type { InjectionKey, Ref } from "vue";

export const provideIsDrawerOpenSymbol: InjectionKey<Ref<boolean>> = Symbol();
