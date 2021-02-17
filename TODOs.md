Next up

- [ ] send timing stats to client in ghpreview
- [ ] switch to plausible analytics
- [ ] clean up API routes
- [ ] need to put auth in front of post2md route
- [ ] design stats collection to power billing
- [ ] can I use logflare as Google Analytics (disable console logging only send to log drain)
- [ ] establish the pattern of axios call inside of db.js from client side

Done

- [x] set up seo, at leset the link card should work in my blog, maybe use next-seo
- [x] have a correct account page
- [x] on use preview in db if site hasm't be updated after preview's creation time
- [x] html to markdown converstion utils
- [x] My sites page should have a good empty state
- [x] set up logflare for vercel
- [x] look into https://github.com/pinojs/pino/blob/master/docs/browser.md; and pino pretty
- [x] site tabel shouldn't display preview ratio or any other settings
- [x] in deletion flow need to delete Ghost webhook
- [x] edit modal's default value need to be reset after update
- [x] refactor add site vs edit site modal, too much repeated logic
- [x] undo the refactor; we need to restrict what people can edit
- [x] edit site modal used the write mutation flow, need to change add site modal to match that
- [x] add add new site button to dashboard
- [x] set up firestore access rule for webhook creation
- [x] add the webhook creation into somewhere in the site registration flow
- [x] adjust site table to show read only content (stats etc)
- [x] add delete site button and logic
- [x] add site edit flow, through a modal

Backlog

- [ ] show some stats/analytics for each site?
- [ ] add site details view, as a modal?
- [ ] display webhook status somewhere
- [ ] add ways to create webhook later
- [ ] test out post.unpublished and post.published event handling
- [ ] log a list of blog topics

Optional

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
