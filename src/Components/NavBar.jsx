import React, { useCallback, useEffect, useState } from "react";
import {
  AiFillHome,
  AiFillCompass,
  AiOutlineBulb,
  AiFillThunderbolt,
  AiFillCaretDown
} from "react-icons/ai";
import {
  BsFillBagFill,
  BsFillPersonFill,
} from "react-icons/bs";
import {
  CgInbox,
  CgMonday,
} from "react-icons/cg";
import { Link } from "react-router-dom";
import { auth } from "../Firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const iconMap = {
  Home: <AiFillHome />,
  Discover: <AiFillCompass />,
  Discussion: <CgInbox />,
  Profile: <BsFillPersonFill />,
  Challenges: <AiFillThunderbolt />,
};

const linkMap = {
  Home: "/",
  Discover: "/discover",
  Discussion: "/discussion",
  Profile: "/profile",
  Challenges: "/challenges",
};

const Navbar = ({ navigationData = [], currentRoute, setCurrentRoute }) => {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
 
  const getTabIcon = useCallback((item) => iconMap[item] || null, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        console.log("User logged in:", currentUser.displayName);
      } else {
        setUser(null);
        console.log("No user is logged in");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="bg-dark sticky top-0 hidden md:flex items-center justify-between px-8 h-20 bg-dark rounded-b-3xl shadow z-[99]">
        <span className="text-5xl text-light -mb-1 logo">
          ETH-X01
        </span>
        <ul className="flex flex-row gap-6">
          {navigationData.map((item, index) => (
            <li key={index}>
              {item === "Challenges" ? (
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className={`text-sm font-medium transition-all duration-200 flex items-center gap-1 ${
                      currentRoute === item
                        ? "text-gray-700 border-b-4 border-gray-700 pb-1"
                        : "text-light hover:text-gray-700"
                    }`}
                  >
                    {item}
                    <AiFillCaretDown className="text-xs" />
                  </button>
                  
                  {showDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                      <Link
                        to="/leetcode"
                        onClick={() => {
                          setCurrentRoute(item);
                          setShowDropdown(false);
                        }}
                        className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-600"
                      >
                        🚀 LeetCode Challenges
                      </Link>
                      <Link
                        to="/python-crash-course"
                        onClick={() => {
                          setCurrentRoute(item);
                          setShowDropdown(false);
                        }}
                        className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        🐍 Python Crash Course
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={linkMap[item] || "/"}
                  onClick={() => setCurrentRoute(item)}
                  className={`text-sm font-medium transition-all duration-200 ${
                    currentRoute === item
                      ? "text-gray-700 border-b-4 border-gray-700 pb-1"
                      : "text-light hover:text-gray-700"
                  }`}
                >
                  {item}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {user ? (
          <Link to={"/profile"}>
            <div className="flex flex-row-reverse items-center gap-3">
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-8 h-8 rounded-full ml-2"
              />
              <span className="text-sm font-medium text-light">
                {user.displayName?.split(" ")[0]}
              </span>
            </div>
          </Link>
        ) : (
          <Link
            className="bg-green-700 border-2 border-gray-900 px-8 hover:bg-amber-500 py-2 rounded-lg text-sm font-medium text-light transition-all duration-300"
            to="/login"
          >
            LogIn
          </Link>
        )}
      </nav>

      {/* Mobile Tabbar */}
<nav className="bg-dark md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-4 h-20 bg-white rounded-t-3xl text-2xl shadow-md">
  {navigationData.map((item, index) => (
    <div key={index} className="relative">
      {item === "Challenges" ? (
        <>
          <button
            onClick={() => setShowDropdown(showDropdown === item ? null : item)}
            className={`w-16 h-full flex items-center justify-center cursor-pointer ${
              currentRoute === item
                ? "text-orange-500 border-t-4 border-orange-500 bg-gradient-to-t from-white to-orange-50"
                : "text-primary hover:text-gray-700"
            }`}
          >
            <span className="-mb-1">{getTabIcon(item)}</span>
          </button>

          {showDropdown === item && (
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-52 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
              <Link
                to="/challenges/leetcode"
                onClick={() => {
                  setCurrentRoute(item);
                  setShowDropdown(null);
                }}
                className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-600"
              >
                🚀 LeetCode Challenges
              </Link>
              <Link
                to="/challenges/python-crash-course"
                onClick={() => {
                  setCurrentRoute(item);
                  setShowDropdown(null);
                }}
                className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                🐍 Python Crash Course
              </Link>
            </div>
          )}
        </>
      ) : (
        <Link
          to={linkMap[item] || "/"}
          onClick={() => {
            setCurrentRoute(item);
            setShowDropdown(null);
          }}
          className={`w-16 h-full flex items-center justify-center cursor-pointer ${
            currentRoute === item
              ? "text-orange-500 border-t-4 border-orange-500 bg-gradient-to-t from-white to-orange-50"
              : "text-primary hover:text-gray-700"
          }`}
        >
          <span className="-mb-1">{getTabIcon(item)}</span>
        </Link>
      )}
    </div>
  ))}
</nav>

    </>
  );
};

export default Navbar;