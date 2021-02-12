import pino from 'pino';
import { logflarePinoVercel } from 'pino-logflare';

const { stream, send } = logflarePinoVercel({
  apiKey: process.env.NEXT_PUBLIC_LOGFLARE_KEY,
  sourceToken: process.env.NEXT_PUBLIC_LOGFLARE_STREAM,
});

const config = {
  browser: {
    transmit: {
      level: 'info',
      send: send,
    },
  },
  level: 'debug',
  base: {
    env: process.env.NODE_ENV || 'ENV not set',
    revision: process.env.VERCEL_GITHUB_COMMIT_SHA,
  },
};

let pinoLogger;
if (process.env.NODE_ENV === 'production') {
  pinoLogger = pino(config, stream);
} else {
  config.prettyPrint = true;
  pinoLogger = pino(config);
}

const formatObjectKeys = (headers) => {
  const keyValues = {};

  Object.keys(headers).map((key) => {
    const newKey = key.replace(/-/g, '_');
    keyValues[newKey] = headers[key];
  });

  return keyValues;
};

function logError(req, res, errorObj, msg) {
  pinoLogger.error(
    {
      errorObj,
      request: {
        url: req.url,
        method: req.method,
        headers: formatObjectKeys(req.headers),
      },
      response: {
        statusCode: res.statusCode,
      },
    },
    msg
  );
}

export { pinoLogger, logError, formatObjectKeys };
