const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fs = require("fs");

admin.initializeApp();

const db = admin.firestore();

// Load your JSON file
const challenges = require("./challenges.json");

// Start date to determine which challenge to post
const startDate = new Date("2025-07-20T21:00:00Z"); // midnight TC+3 on July 20

exports.postDailyChallenge = functions.pubsub.schedule("every day 00:00").onRun(async (context) => {
  const today = new Date();
  const dayDiff = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));

  if (dayDiff < 0 || dayDiff >= challenges.length) {
    console.log("No challenge to post today.");
    return null;
  }

  const challenge = challenges[dayDiff];
  const challengeId = `${challenge.patternTitle.replace(/\s+/g, "_")}_${challenge.dayTitle.replace(/\s+/g, "")}`;

  try {
    await db.collection("challenges").doc(challengeId).set({
      ...challenge,
      createdAt: admin.firestore.Timestamp.fromDate(new Date()),
    });

    console.log(`✅ Challenge posted: ${challenge.dayTitle}`);
  } catch (err) {
    console.error("❌ Failed to post challenge:", err);
  }

  return null;
});
