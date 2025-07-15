import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider, db } from "../Firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; // ← at top of the fil

const LoginPage = () => {
  const navigate = useNavigate();
  const handleGoogleLogin = async () => {
    
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          score: 0,
          role: "member",
          createdAt: serverTimestamp(),
        });
      }

      console.log("Login successful:", user.displayName);
      navigate("/profile");

    } catch (err) {
      console.error("Google Login Error:", err.code, err.message);
      alert("Login failed: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-surface text-primary flex justify-center items-center">
      <div className="max-w-screen-xl bg-dark shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Sign In</h1>

            {/* ✅ NEW INFO TEXT */}
            <p className="mt-3 text-sm text-center text-secondary">
              We currently accept <strong>only Google login</strong>. <br />
              Sign in using your Google account.
            </p>

            <div className="w-full flex-1 mt-8">
              <div className="flex flex-col items-center">
                {/* ✅ Google Login Button with Hover/Click Effects */}
                <button
                  onClick={handleGoogleLogin}
                  className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-white border border-gray-300 flex items-center justify-center transition-all duration-200 hover:bg-gray-100 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <div className="bg-white p-2 rounded-full">
                   <svg className="w-5 h-5" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M533.5 278.4c0-17.7-1.6-35-4.7-51.6H272v97.7h146.9c-6.3 33.6-25.1 62-53.6 81l87 67.6c50.6-46.6 80.2-115.4 80.2-194.7z"
    fill="#4285f4"
  />
  <path
    d="M272 544.3c72.6 0 133.5-24 178-65.2l-87-67.6c-24.1 16.2-55 25.6-91 25.6-69.9 0-129-47.2-150.2-110.4l-89.4 69c43.6 86.3 133 148.6 239.6 148.6z"
    fill="#34a853"
  />
  <path
    d="M121.8 326.7c-10.4-30.7-10.4-63.9 0-94.6l-89.5-69C4.5 213.5-9.6 264.8 0.2 316.5c9.8 51.8 39 98.1 83 129.7l89.4-69c-11.1-20.8-17.7-43.9-17.7-69z"
    fill="#fbbc04"
  />
  <path
    d="M272 107.6c39.5-.6 77.3 13.9 106.4 40.8l79.2-79.2C409.5 24.2 341.9-1 272 0 165.4 0 76 62.3 32.4 148.5l89.5 69c21.3-63.2 80.3-110.3 150.1-110z"
    fill="#ea4335"
  />
                    </svg>

                  </div>
                  <span className="ml-4 text-black">Sign In with Google</span>
                </button>

                {/* ❌ GitHub Disabled */}
                <button
                  disabled
                  className="w-full max-w-xs font-bold rounded-lg py-3 mt-5 opacity-30 cursor-not-allowed bg-indigo-100 text-gray-500 flex items-center justify-center"
                >
                  <span className="ml-4">Sign In with GitHub (Disabled)</span>
                </button>
              </div>

              {/* ❌ Email Sign Up (Disabled) */}
              <div className="my-12 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-secondary tracking-wide font-medium bg-dark transform translate-y-1/2">
                  Or sign up with e-mail
                </div>
              </div>

              <div className="mx-auto max-w-xs opacity-30 pointer-events-none ">
                <input
                  className="w-full px-8 py-4 rounded-lg bg-gray-100 border text-secondary border-gray-200 text-sm"
                  type="email"
                  placeholder="Email"
                  disabled
                />
                <input
                  className="w-full px-8 py-4 mt-5 rounded-lg bg-gray-100 border text-secondary border-gray-200 text-sm"
                  type="password"
                  placeholder="Password"
                  disabled
                />
                <button
                  className="mt-5 bg-primary text-gray-100 w-full py-4 rounded-lg flex items-center justify-center"
                  disabled
                >
                  <span className="ml-3">Sign Up (Disabled)</span>
                </button>
                <p className="mt-6 text-xs text-secondary text-center">
                  I agree to abide by your community's{" "}
                  <a href="#" className="border-b border-gray-500 border-dotted">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="border-b border-gray-500 border-dotted">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
