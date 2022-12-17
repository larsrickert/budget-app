import "@/styles/index.scss";

import { setup } from "@storybook/vue3";
import { ElLoading } from "element-plus";
import "element-plus/theme-chalk/dark/css-vars.css";
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
  backgrounds: {
    default: "light",
    values: [
      { name: "light", value: "#fff" },
      { name: "dark", value: "#141414" },
    ],
  },
};

setup((app) => {
  app.use(i18n).use(ElLoading);
});
