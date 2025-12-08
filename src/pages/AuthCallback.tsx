import React, { useEffect } from "react";

const AuthCallback: React.FC = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    console.log("Google OAuth Code:", code);
    
    // Next Step: Exchange "code" with Google for token
    // (We can build this next if you want)
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center bg-black text-white">
      <h2>Authenticating...</h2>
    </div>
  );
};

export default AuthCallback;
