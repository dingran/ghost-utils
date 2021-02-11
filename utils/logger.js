import pino from 'pino';
import { logflarePinoVercel } from 'pino-logflare';

const { stream, send } = logflarePinoVercel({
  apiKey: process.env.NEXT_PUBLIC_LOGFLARE_KEY,
  sourceToken: process.env.NEXT_PUBLIC_LOGFLARE_STREAM,
});

const logger = pino(
  {
    browser: {
      transmit: {
        send: send,
      },
    },
    level: 'debug',
    base: {
      env: process.env.NODE_ENV || 'ENV not set',
      revision: process.env.VERCEL_GITHUB_COMMIT_SHA,
    },
  },
  stream
);

const formatObjectKeys = (headers) => {
  const keyValues = {};

  Object.keys(headers).map((key) => {
    const newKey = key.replace(/-/g, '_');
    keyValues[newKey] = headers[key];
  });

  return keyValues;
};

function logError(req, res, error) {
  logger.error(
    {
      request: {
        headers: formatObjectKeys(req.headers),
        url: req.url,
        method: req.method,
      },
      response: {
        statusCode: res.statusCode,
      },
    },
    error.message
  );
}

export { logger, logError, formatObjectKeys };
