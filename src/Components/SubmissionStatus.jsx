import React from "react";

const SubmissionStatus = ({ status }) => {
  if (status === "idle") return null;

  const statusStyles = {
    loading: "text-blue-600",
    success: "text-green-600",
    error: "text-red-600",
  };

  const messages = {
    loading: "Submitting your answer...",
    success: "✅ Submission successful!",
    error: "❌ Something went wrong. Try again.",
  };

  return (
    <div className={`my-4 text-center font-semibold ${statusStyles[status]}`}>
      {status === "loading" ? (
        <div className="flex justify-center items-center space-x-2">
          <div className="w-4 h-4 bg-current rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-current rounded-full animate-bounce [animation-delay:.1s]"></div>
          <div className="w-4 h-4 bg-current rounded-full animate-bounce [animation-delay:.2s]"></div>
          <span className="ml-4">{messages[status]}</span>
        </div>
      ) : (
        <p>{messages[status]}</p>
      )}
    </div>
  );
};

export default SubmissionStatus;
