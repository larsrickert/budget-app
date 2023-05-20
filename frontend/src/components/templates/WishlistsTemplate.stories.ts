import type { VueProps } from "@/types/vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import Component from "./WishlistsTemplate.vue";

type Args = VueProps<typeof Component>;

export default {
  component: Component,
  argTypes: {
    onFetchWishlist: { action: "fetchWishlist" },
  },
} as Meta<Args>;

export const Primary = {
  args: {
    wishlists: new Array(5).fill("").map((_, index) => {
      const id = index + 1;
      return {
        id: id.toString(),
        name: `Wishlist ${id}`,
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
        userId: "1",
      };
    }),
    selectedWishlist: {
      id: "1",
      name: "Wishlist 1",
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
      userId: "1",
    },
  },
} satisfies StoryObj<Args>;

export const Empty = {
  args: {
    wishlists: [],
  },
} satisfies StoryObj<Args>;

export const Loading = {
  args: {
    ...Primary.args,
    listLoading: true,
    recordLoading: true,
  },
} satisfies StoryObj<Args>;
