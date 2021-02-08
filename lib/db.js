import firebase from './firebase';
const firestore = firebase.firestore();

export async function createUser(uid, data) {
  return await firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}

export async function createSite(data) {
  const site = firestore.collection('ghost_sites').doc(); // returns DocRef
  await site.set(data); // returns Promise<void>, so we need to await
  return site;
}

export async function getSite(siteId) {
  const site = await firestore.collection('ghost_sites').doc(siteId).get();
  return site;
}
