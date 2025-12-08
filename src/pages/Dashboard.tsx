import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Footer from "../components/Footer";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  // LOAD SIMULATION HISTORY
  useEffect(() => {
    async function loadHistory() {
      if (!user) return;
      const { data, error } = await supabase
        .from("simulations")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error) setHistory(data);
    }
    loadHistory();
  }, [user]);

  async function logout() {
    await supabase.auth.signOut();
    localStorage.removeItem("cloudicore_user");
    window.location.href = "/";
  }

  return (
    <div className="bg-cloudi-bg min-h-screen text-white pb-32">
      
      {/* ================= HEADER ================= */}
      <header className="flex justify-between items-center p-6">
        <h1 className="text-3xl font-bold">
          CloudiCore <span className="gradient-text">Dashboard</span>
        </h1>

        {/* PROFILE MENU */}
        {user && (
          <div className="relative group">
            <button className="px-4 py-2 bg-cloudi-card rounded-xl border border-slate-700 hover:border-slate-500">
              {user.email.split("@")[0]}
            </button>

            <div className="absolute right-0 mt-2 bg-cloudi-card border border-slate-800 rounded-2xl p-3 w-44 hidden group-hover:block shadow-xl z-[1000]">
              <button className="text-left w-full btn-secondary mb-2" onClick={() => alert("Upgrade coming soon!")}>
                🚀 Upgrade Plan
              </button>
              <button className="text-left w-full btn-primary" onClick={logout}>
                Logout
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ================= MAIN ================= */}
      <section className="section text-center mt-10">
        <h2 className="text-4xl font-extrabold">
          Welcome, <span className="gradient-text">{user?.email}</span>
        </h2>
        <p className="text-slate-400 mt-3 max-w-2xl mx-auto">
          Your simulations, insights, and decisions in one place.
        </p>
      </section>

      {/* PRICING / UPGRADE CTA */}
      <section className="section mt-20 text-center">
        <h2 className="text-3xl font-bold">Your Current Plan: <span className="gradient-text">Free</span></h2>
        <p className="text-slate-400 mt-3">Upgrade to unlock advanced simulations & exporting.</p>
        
        <button
          className="btn-primary mt-6 px-10"
          onClick={() => alert("Upgrade system will be added after Stripe/Razorpay integration")}
        >
          🚀 Upgrade to Premium
        </button>
      </section>

      {/* ================== SIMULATION HISTORY ================== */}
      <section className="section mt-24">
        <h2 className="text-3xl font-bold text-center mb-10">Simulation History</h2>

        {history.length === 0 ? (
          <p className="text-slate-400 text-center">No history yet. Run your first simulation.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {history.map((h: any) => (
              <div
                key={h.id}
                className="bg-cloudi-card/60 p-6 rounded-xl border border-slate-800 shadow-xl"
              >
                <p className="text-slate-500 text-sm">
                  {new Date(h.created_at).toLocaleString()}
                </p>
                <p className="font-semibold text-lg mt-2">
                  {h.scenario.slice(0, 60)}...
                </p>
                <div className="text-slate-300 text-sm mt-2 space-y-1">
                  <p><b>Revenue:</b> ₹{h.revenue}</p>
                  <p><b>Cost:</b> ₹{h.cost}</p>
                  <p><b>Months:</b> {h.months}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

