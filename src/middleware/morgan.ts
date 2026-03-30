import morgan from "morgan";
import { logger } from "src/utils/logger";

export const morganMiddleware = morgan(
  function (tokens, req, res) {
    return JSON.stringify({
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      //properly type
      status: Number.parseFloat(tokens.status(req, res) as string),
      content_length: tokens.res(req, res, "content-length"),
      response_time: Number.parseFloat(
        tokens["response-time"](req, res) as string,
      ),
    });
  },
  {
    stream: {
      write: (message) => {
        const data = JSON.parse(message);
        logger.http(`incoming-request`, data);
      },
    },
  },
);
