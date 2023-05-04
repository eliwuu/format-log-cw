import util from "util";

const stringify = (error: object | null | undefined, withStack: boolean) => {
  if (error === null || error === undefined) {
    return "Null or undefined error";
  }
  if (Array.isArray(error)) {
    try {
      return JSON.stringify(error);
    } catch (e) {
      return JSON.stringify(util.inspect(error));
    }
  }
  if (error instanceof Error) {
    const { name, message, stack } = error;

    if (withStack) {
      return JSON.stringify({ name, message, stack }, null, 2);
    } else {
      return JSON.stringify({ name, message }, null, 2);
    }
  }
  try {
    return JSON.stringify(error, null, 2);
  } catch (e) {
    return util.inspect(error);
  }
};

const formattedLog =
  (errorLevel: "info" | "warning" | "error" | "debug") =>
  (withStack: boolean = false) =>
  (origin: string, message: unknown) => {
    if (errorLevel === "debug" && process.env.NODE_ENV === "production") {
      return;
    }
    if (typeof message === "object") {
      console.log(
        `${errorLevel.toUpperCase()}:`,
        `[${origin}] ${stringify(message, withStack)}`
      );
    } else {
      console.log(
        `${errorLevel.toUpperCase()}:`,
        `[${origin}] ${message ?? "Null or undefined error"}`
      );
    }
  };

const logOnError = (
  origin: string,
  error: unknown,
  options?: { withStack: boolean }
) => formattedLog("error")(options?.withStack)(origin, error);

export const logError = logOnError;
export const logInfo = formattedLog("info")(false);
export const logWarning = formattedLog("warning")(false);
export const logDebug = formattedLog("debug")(false);
