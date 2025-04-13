import logger from "electron-log";
import * as os from "os";
const platform = process.platform as "darwin" | "win32" | "linux";
const architucture: "64" | "32" = os.arch() === "x64" ? "64" : "32";
const time = new Date().toISOString().replace(/:/g, "-").slice(0, 19);
// Log settings
// ============
logger.transports.file.level = "info";
logger.transports.file.fileName = `patent-${platform}-${architucture}-${time}.log`;

export default logger;
