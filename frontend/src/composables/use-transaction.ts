import type { BaseRecord } from "@/pocketbase";
import { useRecord } from "./use-record";

export const TRANSACTION_TYPES = ["outcome", "income"] as const;
export type TransactionType = typeof TRANSACTION_TYPES[number];

export enum TransactionFrequency {
  NONE = "",
  MONTHLY = "1",
  QUARTERLY = "3",
  SEMIANNUAL = "6",
  ANNUAL = "12",
  BIENNIAL = "24",
}

export interface TransactionDto extends BaseRecord {
  name: string;
  value: number;
  type: TransactionType;
  notes: string;
  bookingDate: string;
  frequency: TransactionFrequency;
  userId: string;
}

export type CreateTransactionDto = Pick<
  TransactionDto,
  "name" | "value" | "type"
> &
  Partial<Pick<TransactionDto, "bookingDate" | "frequency" | "notes">>;

export const useTransaction = () => {
  return useRecord<TransactionDto, CreateTransactionDto>("transactions");
};
