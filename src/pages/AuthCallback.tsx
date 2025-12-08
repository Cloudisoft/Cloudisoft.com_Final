import React, { useEffect } from "react";

const AuthCallback: React.FC = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    console.log("Google OAuth Code:", code);

    // Later: Exchange this `code` for Google tokens
    // For now: Just store code OR show success UI
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>Redirecting...</h2>
      <p>Please wait while we complete authentication.</p>
    </div>
  );
};

export default AuthCallback;
