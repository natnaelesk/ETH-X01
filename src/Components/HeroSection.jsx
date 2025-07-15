// src/components/HeroSection.jsx
import React, { useEffect, useState } from "react";
import { auth } from "../Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  return (
    <section className="max-h-[60vh] flex justify-center items-center px-5 lg:grid lg:h-screen lg:place-content-center dark:bg-dark">
      <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-prose text-center">
          <h1 className="text-6xl uppercase font-black  sm:text-7xl text-primary">
            Welcome to <br /><span className="text-accent text-6xl lg:text-7xl ">ETH-X01</span>
          </h1>

          <p className="mt-4 text-lg text-secondary dark:text-gray-200">
            We're a growing community of passionate Ethiopian programmers & IT students.
            We help each other level up through coding challenges, collaboration, and consistency.
          </p>

          <div className="mt-6 flex justify-center">
            <Link to={user ? "#!" : "/login"}>
              <button
                disabled={!!user}
                className={`px-6 py-3 rounded-lg font-semibold shadow-md transition duration-300
                  ${user
                    ? "bg-gray-500 text-white cursor-not-allowed"
                    : "bg-amber-500 text-black hover:bg-orange-600"}
                `}
              >
                {user ? "You're already in 🙌" : "Join Our Community"}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
