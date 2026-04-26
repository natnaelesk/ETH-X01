import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "@/Firebase";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const userRef = doc(db, "users", firebaseUser.uid);
        const snapshot = await getDoc(userRef);
        const profile = snapshot.exists() ? snapshot.data() : {};

        setUser({
          uid: firebaseUser.uid,
          name: profile.name || firebaseUser.displayName || "Learner",
          email: profile.email || firebaseUser.email || "",
          photoURL: profile.photoURL || firebaseUser.photoURL || "",
          score: profile.score ?? 0,
          role: profile.role || "member",
        });
      } catch (error) {
        console.error("Failed to load auth profile:", error);
        setUser({
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || "Learner",
          email: firebaseUser.email || "",
          photoURL: firebaseUser.photoURL || "",
          score: 0,
          role: "member",
        });
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    logout: () => signOut(auth),
  };
}
