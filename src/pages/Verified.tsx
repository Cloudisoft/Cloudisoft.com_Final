import { useEffect } from "react";

export default function Verified() {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 2000);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4 gradient-text">Email Verified!</h1>
      <p className="text-slate-300">Redirecting to your dashboard...</p>
    </div>
  );
}
