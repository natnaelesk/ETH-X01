import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../Firebase";
import SubmissionStatus from "../Components/SubmissionStatus"; // adjust path as needed
import { useAuth } from "../app/useAuth";

import {
  doc,
  getDoc,
  collection,
  addDoc,
  query,
  orderBy,
  getDocs,
  updateDoc,
  arrayUnion,
  increment,
} from "firebase/firestore";

const ChallengeDetailsPage = () => {
  const [submissionStatus, setSubmissionStatus] = useState("idle"); // idle | loading | success | error
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [answers, setAnswers] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    const fetchChallenge = async () => {
      const ref = doc(db, "challenges", id);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setChallenge({ id: snap.id, ...snap.data() });
      }
    };

    const fetchSubmissions = async () => {
      const q = query(
        collection(db, `challenges/${id}/submissions`),
        orderBy("timestamp", "asc")
      );
      const snapshot = await getDocs(q);
      setSubmissions(snapshot.docs.map((doc) => doc.data()));
    };

    fetchChallenge();
    fetchSubmissions();
  }, [id]);

  const handleCheck = (questionName) => {
    setAnswers((prev) => ({
      ...prev,
      [questionName]: {
        ...prev[questionName],
        showInput: !prev[questionName]?.showInput,
      },
    }));
  };

  const handleInputChange = (questionName, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionName]: {
        ...prev[questionName],
        link: value,
      },
    }));
  };

 const handleSubmit = async (question) => {
  const link = answers[question.name]?.link;
  if (!link || !user) {
    alert("You must be logged in to submit.");
    return;
  }

  const urlPattern = /^(https?:\/\/)?(www\.)?leetcode\.com\/.+$/;
  if (!urlPattern.test(link)) {
    alert("Please enter a valid LeetCode URL.");
    return;
  }

  setSubmissionStatus("loading");

  try {
    await addDoc(collection(db, `challenges/${id}/submissions`), {
      userId: user.uid,
      userName: user.displayName,
      photoURL: user.photoURL,
      questionName: question.name,
      link,
      timestamp: new Date(),
    });

    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      completedProblems: arrayUnion({ name: question.name, link }),
      score: increment(50),
    });

    setAnswers((prev) => ({
      ...prev,
      [question.name]: { link: "", showInput: false },
    }));

    const snapshot = await getDocs(
      query(collection(db, `challenges/${id}/submissions`), orderBy("timestamp", "asc"))
    );
    setSubmissions(snapshot.docs.map((doc) => doc.data()));
    setSubmissionStatus("success");
  } catch (err) {
    console.error("Submission error:", err);
    setSubmissionStatus("error");
  }

  setTimeout(() => setSubmissionStatus("idle"), 3000); // Auto reset after 3s
};


  if (!challenge) return <div className="p-6">Loading challenge...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <SubmissionStatus status={submissionStatus} />
      <div className="">
        <h1 className="lg:text-4xl text-3xl font-bold mb-2 text-primary">
        {challenge.patternTitle} - {challenge.dayTitle}
      </h1>
      
      <p className="text-base text-light mt-6">{challenge.longDescription}</p>
      <hr className="my-3 text-secondary" />
      <p className="text-sm text-secondary mb-4 text-light">{challenge.shortDescription}</p>

      </div>
      ,# this is just none sence am trying to write it wount be that muxch of a big deal 
      
      <div className="space-y-6">
        {challenge.questions?.map((q) => {
          const userSubmitted = submissions.some(
            (s) => s.userId === user?.uid && s.questionName === q.name
          );

          return (
            <div key={q.name} className="bg-dark p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <a
                  href={q.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light underline underline-offset-4 decoration-blue-500 font-medium"
                >
                  {q.name}
                </a>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      disabled={userSubmitted}
                      checked={answers[q.name]?.showInput || false}
                      onChange={() => handleCheck(q.name)}
                      className="form-checkbox text-accent w-5 h-5 accent-green-500"
                    />
                    <span className={`font-semibold ${
                      userSubmitted ? "text-gray-400" : "text-accent"
                    }`}>
                      {userSubmitted
                        ? "Submitted"
                        : answers[q.name]?.showInput
                        ? "cancel"
                        : ""}
                    </span>
                  </label>


              </div>

              {answers[q.name]?.showInput && !userSubmitted && (
                <div className="mt-2 space-y-2">
                  <input
                    type="url"
                    required
                    placeholder="Paste your LeetCode submission link"
                    value={answers[q.name]?.link || ""}
                    onChange={(e) => handleInputChange(q.name, e.target.value)}
                    className="w-full px-3 py-2 border rounded text-gray-600"
                  />
                  {answers[q.name]?.link &&
                    !/^(https?:\/\/)?(www\.)?leetcode\.com\/.+$/.test(
                      answers[q.name].link
                    ) && (
                      <p className="text-red-500 text-sm">
                        Invalid LeetCode URL
                      </p>
                    )}
                  <button
                    onClick={() => handleSubmit(q)}
                    className="bg-accent text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Done 
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4 text-primary">Submissions</h2>
        {submissions.length === 0 ? (
          <p className="text-gray-500">No one has submitted yet.</p>
        ) : (
          <ul className="space-y-4">
            {submissions.map((s, idx) => (
              <li key={idx} className="bg-gray-400 p-4 rounded shadow">
                <div className="flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <img
                      src={s.photoURL}
                      alt="avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{s.userName}</p>
                      <p className="text-xs text-gray-500">{s.questionName}</p>
                    </div>
                  </div>
                  <a
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-indigo-500 underline"
                  >
                    View Link
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ChallengeDetailsPage;
