import morgan from "morgan";

const logger = morgan(":method :url :status");

export default logger;
