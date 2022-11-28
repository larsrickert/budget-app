import { describe, expect, it } from "vitest";

import { mount } from "@vue/test-utils";
import HelloWorld from "../HelloWorld.vue";

describe("HelloWorld", () => {
  it("renders properly", () => {
    const wrapper = mount(HelloWorld, { props: { msg: "Hello World" } });
    expect(wrapper.text()).toContain("Hello World");
  });
});
