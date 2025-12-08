// ==========================
// AUTH MODAL (FINAL VERSION)
// ==========================
function AuthModal({ close }: any) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // -----------------------
  // LOGIN USING EMAIL
  // -----------------------
  async function loginEmail() {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    });
    setLoading(false);
    if (error) setError(error.message);
    else window.location.href = "/dashboard";
  }

  // -----------------------
  // SIGNUP NEW USER
  // -----------------------
  async function signupEmail() {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signUp({
      email,
      password: pass,
      options: {
        emailRedirectTo: "https://cloudisoft.com/verified",
      },
    });
    setLoading(false);
    if (error) setError(error.message);
    else setError("Signup successful! Check email to verify.");
  }

  // -----------------------
  // GOOGLE LOGIN
  // -----------------------
  async function loginGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://cloudisoft.com/auth/callback",
      },
    });
  }

  // -----------------------
  // MICROSOFT LOGIN
  // -----------------------
  async function loginMicrosoft() {
    await supabase.auth.signInWithOAuth({
      provider: "azure",
      options: {
        redirectTo: "https://cloudisoft.com/auth/callback",
      },
    });
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999] p-4">
      <div className="bg-cloudi-card p-8 rounded-3xl border border-slate-800 w-full max-w-md relative">
        
        {/* CLOSE MODAL BUTTON */}
        <button className="absolute right-4 top-4 text-slate-400" onClick={close}>✕</button>

        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

        {/* GOOGLE LOGIN */}
        <button
          className="btn-secondary w-full flex items-center justify-center gap-3 mb-3"
          onClick={loginGoogle}
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="" />
          Continue with Google
        </button>

        {/* MICROSOFT LOGIN */}
        <button
          className="btn-secondary w-full flex items-center justify-center gap-3 mb-6"
          onClick={loginMicrosoft}
        >
          <img src="https://www.svgrepo.com/show/475665/microsoft.svg" className="w-5 h-5" alt="" />
          Continue with Microsoft
        </button>

        <div className="text-center text-slate-400 text-sm mb-4">or login with Email</div>

        {/* EMAIL INPUT */}
        <input
          className="w-full p-3 rounded-xl bg-cloudi-card/60 border border-slate-800 mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD INPUT */}
        <input
          className="w-full p-3 rounded-xl bg-cloudi-card/60 border border-slate-800 mb-3"
          placeholder="Password"
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        {/* ERROR HANDLING */}
        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

        {/* LOGIN BUTTON */}
        <button
          className="btn-primary w-full mb-3"
          onClick={loginEmail}
          disabled={loading}
        >
          {loading ? "Processing..." : "Login"}
        </button>

        {/* SIGNUP BUTTON */}
        <button
          className="btn-secondary w-full"
          onClick={signupEmail}
          disabled={loading}
        >
          {loading ? "Processing..." : "Create Account"}
        </button>

        <p className="text-slate-400 text-sm mt-6 text-center">
          Secure login provided by Supabase
        </p>
      </div>
    </div>
  );
}
