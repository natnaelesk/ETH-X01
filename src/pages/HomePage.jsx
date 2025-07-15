// src/pages/HomePage.jsx
import React from "react";
import Navbar from "../Components/NavBar";
import Footer from "../Components/Footer";
import GridShowcase from "../Components/GridShowcase";
import HeroSection from "../Components/HeroSection";
import FeatureArticle from "../Components/Card";
import DiscussionPanel from "./DiscussionPage";

const HomePage = () => {
  return (
    <div className="px-4 py-8 sm:px-6 lg:px-16 space-y-12">
      <HeroSection />
      <main className="flex-grow px-4 py-8 sm:px-6 lg:px-16 space-y-12">
        <GridShowcase
          challenges={[
            {
              id: 1,
              title: "Today's Challenge",
              description: "Solve Two Sum using binary search.",
              date: "July 12, 2025",
              difficulty: "Easy",
              timeToSolve: "15 mins",
            },
            {
              id: 2,
              title: "Yesterday's Challenge",
              description: "Implement LRU Cache from scratch.",
              date: "July 11, 2025",
              difficulty: "Hard",
              timeToSolve: "60 mins",
            },
          ]}
        />
      </main>
      <FeatureArticle />
      <DiscussionPanel />
      <Footer />
    </div>
  );
};

export default HomePage;
