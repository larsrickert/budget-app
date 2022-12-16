import type { BaseRecord } from "@/pocketbase";

export interface AccountDto extends BaseRecord {
  name: string;
  value: number;
  notes: string;
  userId: string;
}
