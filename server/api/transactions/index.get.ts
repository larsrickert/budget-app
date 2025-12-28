import { and, asc, count, desc, eq, isNull } from "drizzle-orm";
import { z } from "zod";
import type { PaginatedList } from "../../../shared/types/api";

export default defineEventHandler(async (event) => {
  const { user } = await requireUser(event);
  const db = useDrizzle();

  const query = await getValidatedQuery(
    event,
    z.object({
      type: z.enum(schema.transactionTypeEnum.enumValues).optional(),
      page: z.coerce.number().int().min(1).optional().default(1),
      pageSize: z.coerce.number().int().min(1).optional().default(15),
    }).parse,
  );

  const conditions = and(
    eq(schema.transactions.userId, user.id),
    query.type ? eq(schema.transactions.type, query.type) : undefined,
  );

  const transactions = await db
    .select()
    .from(schema.transactions)
    .where(conditions)
    .limit(query.pageSize)
    .offset((query.page - 1) * query.pageSize)
    .orderBy(
      desc(isNull(schema.transactions.bookingDate)), // order null values first
      asc(schema.transactions.bookingDate),
      (query.type === "outcome" ? asc : desc)(schema.transactions.value),
    );

  const [countQuery] = await db
    .select({ count: count() })
    .from(schema.transactions)
    .where(conditions);

  const total = countQuery?.count ?? 0;
  const pages = query.pageSize ? Math.ceil(total / query.pageSize) : 1;

  const data: PaginatedList<Transaction> = {
    items: transactions,
    total,
    pageSize: query.pageSize,
    page: query.page,
    pages,
  };

  return data;
});
