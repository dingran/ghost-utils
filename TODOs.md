- [x] add add new site button to dashboard
- [x] set up firestore access rule for webhook creation
- [x] add the webhook creation into somewhere in the site registration flow
- [ ] add site details view
- [ ] add site edit flow
- [ ] add ways to create webhook later
- [ ] test out post.unpublished and post.published event handling
- [ ] try and fix the following fireabase auth error

```
FirebaseAuthError: Firebase ID token has expired. Get a fresh ID token from your client app and try again (auth/id-token-expired). See https://firebase.google.com/docs/auth/admin/verify-id-tokens for details on how to retrieve an ID token.
    at FirebaseAuthError.FirebaseError [as constructor] (/Users/rding/projects/ghost-utils/node_modules/firebase-admin/lib/utils/error.js:44:28)
    at FirebaseAuthError.PrefixedFirebaseError [as constructor] (/Users/rding/projects/ghost-utils/node_modules/firebase-admin/lib/utils/error.js:90:28)
    at new FirebaseAuthError (/Users/rding/projects/ghost-utils/node_modules/firebase-admin/lib/utils/error.js:149:16)
    at /Users/rding/projects/ghost-utils/node_modules/firebase-admin/lib/auth/token-verifier.js:212:39
    at /Users/rding/projects/ghost-utils/node_modules/jsonwebtoken/verify.js:152:16
    at getSecret (/Users/rding/projects/ghost-utils/node_modules/jsonwebtoken/verify.js:90:14)
    at Object.module.exports [as verify] (/Users/rding/projects/ghost-utils/node_modules/jsonwebtoken/verify.js:94:10)
    at /Users/rding/projects/ghost-utils/node_modules/firebase-admin/lib/auth/token-verifier.js:204:17
    at new Promise (<anonymous>)
    at FirebaseTokenVerifier.verifyJwtSignatureWithKey (/Users/rding/projects/ghost-utils/node_modules/firebase-admin/lib/auth/token-verifier.js:203:16)
    at /Users/rding/projects/ghost-utils/node_modules/firebase-admin/lib/auth/token-verifier.js:188:30
    at runMicrotasks (<anonymous>)
    at processTicksAndRejections (internal/process/task_queues.js:93:5) {
  errorInfo: {
    code: 'auth/id-token-expired',
    message: 'Firebase ID token has expired. Get a fresh ID token from your client app and try again (auth/id-token-expired). See https://firebase.google.com/docs/auth/admin/verify-id-tokens for details on how to retrieve an ID token.'
  },
  codePrefix: 'auth'
```
