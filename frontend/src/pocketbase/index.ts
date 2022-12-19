import { config } from "@/config";
import PocketBase from "pocketbase";

const client = new PocketBase(config.api.host);
export default client;

export interface BaseRecord {
  id: string;
  created: string;
  updated: string;
}
