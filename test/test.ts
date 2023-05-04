import { logError, logDebug } from "../src/main";

describe("logError", () => {
  it("should log an error from string", () => {
    const spy = jest.spyOn(console, "log");
    logError("test", "Test error");
    expect(spy).toHaveBeenCalledWith("ERROR:", "[test] Test error");
  });
  it("should log an error from object", () => {
    const spy = jest.spyOn(console, "log");
    logError("test", { message: "Test error" });
    expect(spy).toHaveBeenCalledWith(
      "ERROR:",
      '[test] {\n  "message": "Test error"\n}'
    );
  });
  it("should log an error from null", () => {
    const spy = jest.spyOn(console, "log");
    logError("test", null);
    expect(spy).toHaveBeenCalledWith(
      "ERROR:",
      "[test] Null or undefined error"
    );
  });
  it("should log an error from undefined", () => {
    const spy = jest.spyOn(console, "log");
    logError("test", undefined);
    expect(spy).toHaveBeenCalledWith(
      "ERROR:",
      "[test] Null or undefined error"
    );
  });
  it("should log an error from number", () => {
    const spy = jest.spyOn(console, "log");
    logError("test", 1);
    expect(spy).toHaveBeenCalledWith("ERROR:", "[test] 1");
  });
  it("should log an error from array", () => {
    const spy = jest.spyOn(console, "log");
    logError("test", [1, 2, 3]);
    expect(spy).toHaveBeenCalledWith("ERROR:", "[test] [1,2,3]");
  });
  it("should log an error from Error", () => {
    const spy = jest.spyOn(console, "log");
    logError("test", new Error("Test error"));
    expect(spy).toHaveBeenCalledWith(
      "ERROR:",
      '[test] {\n  "name": "Error",\n  "message": "Test error"\n}'
    );
  });
  it("should log an error from Error with stack", () => {
    const spy = jest.spyOn(console, "log");
    const error = new Error("Test error");
    error.stack = "Test stack";
    logError("test", error, { withStack: true });
    expect(spy).toHaveBeenCalledWith(
      "ERROR:",
      '[test] {\n  "name": "Error",\n  "message": "Test error",\n  "stack": "Test stack"\n}'
    );
  });
  it("should log an error from object with circular reference", () => {
    const spy = jest.spyOn(console, "log");
    const circularReference: any = {};
    circularReference.myself = circularReference;
    logError("test", circularReference);
    expect(spy).toHaveBeenCalledWith(
      "ERROR:",
      "[test] <ref *1> { myself: [Circular *1] }"
    );
  });
});

describe("logDebug", () => {
  it("should log an error from string", () => {
    const spy = jest.spyOn(console, "log");
    logDebug("test", "Test error");
    expect(spy).toHaveBeenCalledWith("DEBUG:", "[test] Test error");
  });
  it("should log an error from object", () => {
    const spy = jest.spyOn(console, "log");
    logDebug("test", { message: "Test error" });
    expect(spy).toHaveBeenCalledWith(
      "DEBUG:",
      '[test] {\n  "message": "Test error"\n}'
    );
  });
  it("should log an error from null", () => {
    const spy = jest.spyOn(console, "log");
    logDebug("test", null);
    expect(spy).toHaveBeenCalledWith(
      "DEBUG:",
      "[test] Null or undefined error"
    );
  });
  it("should log an error from undefined", () => {
    const spy = jest.spyOn(console, "log");
    logDebug("test", undefined);
    expect(spy).toHaveBeenCalledWith(
      "DEBUG:",
      "[test] Null or undefined error"
    );
  });
  it("should log an error from number", () => {
    const spy = jest.spyOn(console, "log");
    logDebug("test", 1);
    expect(spy).toHaveBeenCalledWith("DEBUG:", "[test] 1");
  });
  it("should log an error from array", () => {
    const spy = jest.spyOn(console, "log");
    logDebug("test", [1, 2, 3]);
    expect(spy).toHaveBeenCalledWith("DEBUG:", "[test] [1,2,3]");
  });
});

describe("logDebug console.log output should be suppressed in production", () => {
  it("should log an error from string", () => {
    const spy = jest.spyOn(console, "log");
    process.env.NODE_ENV = "production";
    logDebug("test", "Test error");
    expect(spy).not.toHaveBeenCalled();
  });
  it("should log an error from object", () => {
    const spy = jest.spyOn(console, "log");
    process.env.NODE_ENV = "production";
    logDebug("test", { message: "Test error" });
    expect(spy).not.toHaveBeenCalled();
  });
  it("should log an error from null", () => {
    const spy = jest.spyOn(console, "log");
    process.env.NODE_ENV = "production";
    logDebug("test", null);
    expect(spy).not.toHaveBeenCalled();
  });
  it("should log an error from undefined", () => {
    const spy = jest.spyOn(console, "log");
    process.env.NODE_ENV = "production";
    logDebug("test", undefined);
    expect(spy).not.toHaveBeenCalled();
  });
  it("should log an error from number", () => {
    const spy = jest.spyOn(console, "log");
    process.env.NODE_ENV = "production";
    logDebug("test", 1);
    expect(spy).not.toHaveBeenCalled();
  });
  it("should log an error from array", () => {
    const spy = jest.spyOn(console, "log");
    process.env.NODE_ENV = "production";
    logDebug("test", [1, 2, 3]);
    expect(spy).not.toHaveBeenCalled();
  });
});
