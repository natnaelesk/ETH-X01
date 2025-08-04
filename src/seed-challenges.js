// seed-challenges.js
const admin = require("firebase-admin");
const serviceAccount = require("./privatekey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const challenges = require("./challenges.json"); // your JSON file with 12 days

async function uploadChallenges() {
  for (let i = 0; i < challenges.length; i++) {
    const challenge = {
      ...challenges[i],
      posted: false,
      dayNumber: i + 1
    };
    await db.collection("challenges_bank").add(challenge);
    console.log(`✅ Uploaded Day ${i + 1}`);
  }
}

uploadChallenges();
