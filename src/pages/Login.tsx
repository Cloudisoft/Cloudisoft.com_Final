import React from "react";

const Login: React.FC = () => {
  const CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID"; // <-- paste your ID here

  const redirectToGoogle = () => {
    const redirectURI = "https://cloudisoft.com/auth/callback"; // or localhost for testing

    const authURL = 
      "https://accounts.google.com/o/oauth2/v2/auth" +
      "?client_id=" + CLIENT_ID +
      "&redirect_uri=" + redirectURI +
      "&response_type=code" +
      "&scope=openid%20profile%20email";

    window.location.href = authURL; // send user to Google login
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Login to CloudiCore</h2>
      <button onClick={redirectToGoogle}>Login with Google</button>
    </div>
  );
};

export default Login;
