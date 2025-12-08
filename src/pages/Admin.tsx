import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [simulations, setSimulations] = useState([]);

  // LOAD USERS
  useEffect(() => {
    supabase
      .from("simulations")
      .select("*, user:users(*)")
      .then(({ data }) => setSimulations(data || []));
  }, []);

  return (
    <div className="bg-cloudi-bg min-h-screen text-white p-10">

      <h1 className="text-4xl font-bold gradient-text mb-10">Admin Panel</h1>

      <h2 className="text-2xl font-bold mb-5">All Simulations</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {simulations.map((s: any) => (
          <div className="bg-cloudi-card/60 p-4 rounded-xl border border-slate-800">
            <p className="text-slate-400 text-sm mb-2">{new Date(s.created_at).toLocaleString()}</p>
            <p><b>User:</b> {s.user?.email}</p>
            <p><b>Scenario:</b> {s.scenario.slice(0, 60)}...</p>
            <p><b>Revenue:</b> {s.revenue}</p>
            <p><b>Cost:</b> {s.cost}</p>
            <p><b>Months:</b> {s.months}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
