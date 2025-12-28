import type { H3Event } from "h3";

export function calculateTotalSum(items: { value: number }[]) {
  return items.reduce((sum, item) => sum + item.value, 0);
}

/**
 * Rounds a number to a specified number of decimal places.
 */
export function roundToDecimals(num: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(num * factor) / factor;
}

export const getIDRouterParam = (event: H3Event) => {
  const id = getRouterParam(event, "id");
  const idAsNumber = id != undefined ? +id : undefined;

  if (!idAsNumber) {
    throw createError({
      message: "Invalid ID parameter",
      status: 400,
    });
  }

  return idAsNumber;
};
