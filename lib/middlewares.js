// Middlewre seems unnecessarily complicated for what I needed to do
// so I didn't end up using this
// reference: https://nextjs.org/docs/api-routes/api-middlewares

import { auth } from '@/lib/firebase-admin';

export function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    const error = new Error('Not authenticated.');
    error.status = 401;
    error.message = 'test';
    return next(error);
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    // decodedToken = jwt.verify(token, 'somesupersecretsecret');
    decodedToken = await auth.verifyIdToken(token);
    decodedToken = null;
    if (!decodedToken || !decodedToken.uid) {
      const error = new Error('Not authenticated.');
      error.status = 401;
      return next(error);
    }

    req.uid = decodedToken.uid;
  } catch (error) {
    //TODO handlle firebase admin errors in more detail
    console.log(error.errorInfo);
    const errorCode = error.errorInfo.code;
    error.status = 401;
    if (errorCode === 'auth/internal-error') {
      error.status = 500;
    }
    return next(error);
  }

  next();
}
