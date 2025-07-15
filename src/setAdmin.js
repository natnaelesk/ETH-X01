const admin = require("firebase-admin");

// Path to your service account key JSON
const serviceAccount = require("./privatekey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Replace with your Firebase Auth user UID
const uid = "NqOyVqnYFmOZN6mdCPdHRM7fGp82";

admin.auth().setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log(`Custom claim 'admin' set to true for user: ${uid}`);
    process.exit(0);
  })
  .catch(error => {
    console.error("Error setting custom claim:", error);
    process.exit(1);
  });
