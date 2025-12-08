import React from "react";

const Login: React.FC = () => {
  const CLIENT_ID =
    "757924400568-0at91ohkm7hau66gm2od6lta14kc27tu.apps.googleusercontent.com";

  // While testing locally, switch redirect uri to localhost
  const redirectURI = "https://cloudisoft.com/auth/callback";
  // const redirectURI = "http://localhost:5173/auth/callback";  // for local testing

  const loginWithGoogle = () => {
    const authURL =
      "https://accounts.google.com/o/oauth2/v2/auth" +
      "?client_id=" +
      CLIENT_ID +
      "&redirect_uri=" +
      redirectURI +
      "&response_type=code" +
      "&scope=openid%20email%20profile";

    window.location.href = authURL;
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-black text-white">
      <button
        onClick={loginWithGoogle}
        className="px-6 py-3 bg-blue-500 rounded-lg text-lg font-semibold hover:bg-blue-600"
      >
        Login with Google
      </button>
    </div>
  );
};

export default Login;
