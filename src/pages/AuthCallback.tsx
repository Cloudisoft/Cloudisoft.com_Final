import { useEffect } from "react";
import { supabase } from "../supabaseClient";

export default function AuthCallback() {

  useEffect(() => {
    handleAuth();
  }, []);

  async function handleAuth() {
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error("AUTH CALLBACK ERROR:", error);
      window.location.href = "/";
      return;
    }

    if (data.session?.user) {
      // Save user to localStorage
      localStorage.setItem("cloudicore_user", JSON.stringify(data.session.user));

      // Redirect to Dashboard
      window.location.href = "/dashboard";
      return;
    }

    // If no session, redirect to homepage
    window.location.href = "/";
  }

  return (
    <div className="text-white text-center p-10">
      <h2>Authenticating...</h2>
    </div>
  );
}
