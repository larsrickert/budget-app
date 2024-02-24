import "@/styles/index.scss";
import "element-plus/theme-chalk/dark/css-vars.css";

import type { Preview } from "@storybook/vue3";
import { setup } from "@storybook/vue3";
import { ElLoading } from "element-plus";
import i18n from "../src/i18n";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
      expanded: true,
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
  },
};

export default preview;

setup((app) => {
  app.use(i18n).use(ElLoading);
});
