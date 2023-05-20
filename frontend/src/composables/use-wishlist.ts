import type { BaseRecord } from "@/pocketbase";
import { useRecord } from "./use-record";

export interface WishlistDto extends BaseRecord {
  name: string;
  userId: string;
}

export const useWishlists = () => {
  return useRecord<WishlistDto, object>("wishlists");
};
