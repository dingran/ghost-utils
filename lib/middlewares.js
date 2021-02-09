// Middlewre seems unnecessarily complicated for what I needed to do
// so I didn't end up using this
// reference: https://nextjs.org/docs/api-routes/api-middlewares

import { auth } from '@/lib/firebase-admin';

export function withAuth(handler) {
  return async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).end('Not authenticated. No Auth header');

    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
      decodedToken = await auth.verifyIdToken(token);
      if (!decodedToken || !decodedToken.uid)
        return res.status(401).end('Not authenticated');
      req.uid = decodedToken.uid;
    } catch (error) {
      //TODO handlle firebase admin errors in more detail
      console.log(error.errorInfo);
      const errorCode = error.errorInfo.code;
      error.status = 401;
      if (errorCode === 'auth/internal-error') {
        error.status = 500;
      }
      return res.status(error.status).end(errorCode);
    }

    return handler(req, res);
  };
}
