import type { BaseRecord } from "@/pocketbase";
import { useRecord } from "./use-record";

export interface AccountDto extends BaseRecord {
  name: string;
  value: number;
  notes: string;
  userId: string;
}

export type CreateAccountDto = Pick<AccountDto, "name" | "value"> &
  Partial<Pick<AccountDto, "notes">>;

export const useAccount = () => {
  return useRecord<AccountDto, CreateAccountDto>("accounts");
};
