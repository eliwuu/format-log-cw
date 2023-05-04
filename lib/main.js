import util from "util";
const stringify = (error) => {
    if (error === null || error === undefined) {
        return "Null or undefined error";
    }
    try {
        return JSON.stringify(error, null, 2);
    }
    catch (e) {
        return JSON.stringify(util.inspect(error), null, 2);
    }
};
const formattedLog = (errorLevel) => (origin, error) => {
    if (errorLevel === "debug" && process.env.NODE_ENV === "production") {
        return;
    }
    if (typeof error === "object") {
        console.log(`${errorLevel.toUpperCase()}:`, `[${origin}] ${stringify(error)}`);
    }
    else {
        console.log(`${errorLevel.toUpperCase()}:`, `[${origin}] ${error}`);
    }
};
export const logError = formattedLog("error");
export const logInfo = formattedLog("info");
export const logWarning = formattedLog("warning");
export const logDebug = formattedLog("debug");
