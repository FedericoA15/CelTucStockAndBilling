"use client";

const BackButton: React.FC = () => {
  const goBack = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  return (
    <button className="text-white" onClick={goBack}>
      ← Volver
    </button>
  );
};

export default BackButton;
