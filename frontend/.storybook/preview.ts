import "@/styles/index.scss";

import { setup } from "@storybook/vue3";
import { ElLoading } from "element-plus";
import i18n from "../src/i18n";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      order: [
        "atoms",
        "molecules",
        "organisms",
        "layouts",
        "templates",
        "views",
      ],
    },
  },
};

setup((app) => {
  app.use(i18n).use(ElLoading);
});
