export const getApiErrorMessage = (error: unknown) => {
  if (typeof error === "string") return error;
  if (!(error instanceof Error)) return;

  if (
    "data" in error &&
    error.data &&
    typeof error.data === "object" &&
    "message" in error.data &&
    typeof error.data.message === "string"
  ) {
    const statusCode =
      "statusCode" in error && typeof error.statusCode === "number" ? error.statusCode : undefined;

    return statusCode ? `${statusCode} ${error.data.message}` : error.data.message;
  }

  return error.message;
};
