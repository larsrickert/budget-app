import { showToast } from "@/utils/io";
import { defineStore } from "pinia";
import type { App } from "vue";

export class CustomError extends Error {
  public readonly message: string;
  public readonly originalError?: Error;

  public constructor(message: string, originalError?: Error) {
    super(message);

    this.name = "CustomError";
    this.message = message;
    this.originalError = originalError;
    if (originalError?.stack) this.stack = originalError.stack;

    /**
     * Set the prototype explicitly
     * @see https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
     */
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  public toString(): string {
    const { message, originalError } = this;
    const msg = `Error: ${message}`;
    return originalError ? `${msg} (${originalError})` : msg;
  }
}

export const useErrorStore = defineStore("errors", () => {
  const handle = async (err: Error | CustomError) => {
    console.error("Caught application error", { err });
    showToast({
      message: err.toString(),
      type: "error",
    });
  };

  const register = (app: App) => {
    window.onerror = (message, source, lineno, colno, error) => {
      if (message instanceof Event) return;
      const err = error ?? new Error(message);
      handle(err);
      return true;
    };

    window.addEventListener("unhandledrejection", (event) => {
      // event.promise contains the promise object
      // event.reason contains the reason for the rejection
      const err =
        event.reason instanceof Error
          ? event.reason
          : new Error(
              `Uncaught promise rejection for: ${JSON.stringify(event.promise)}`
            );

      event.preventDefault();
      handle(err);
    });

    app.config.errorHandler = (err) => {
      if (!(err instanceof Error)) return;
      handle(err);
    };
  };

  return { handle, register };
});
