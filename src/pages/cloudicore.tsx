import { useState } from "react";
import "../index.css"; // ensures classes are available globally

export default function CloudiCore() {
  const [inputs, setInputs] = useState({
    scenario: "",
    revenue: 20000,
    cost: 8000,
    months: 3,
    goal: "growth",
  });

  const [result, setResult] = useState<any>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [error, setError] = useState("");

  const runSimulation = () => {
    if (!inputs.scenario.trim()) {
      setError("Describe your decision first.");
      return;
    }
    const r = inputs.revenue;
    const c = inputs.cost;
    const t = inputs.months;

    const optimistic = r * 1.22 * t - c * 1.12 * t;
    const expected = r * 1.1 * t - c * 1.05 * t;
    const cautious = r * 0.92 * t - c * t;
    const risk = Math.floor(Math.random() * 30) + 35;

    setResult({ optimistic, expected, cautious, risk });
    setShowLogin(true);
  };

  return (
    <div className="bg-cloudi-bg min-h-screen text-white pb-32">

      {/* HERO */}
      <section className="section text-center flex flex-col gap-6 pt-24 pb-8">
        <h1 className="text-4xl sm:text-6xl font-extrabold">
          CloudiCore
          <br />
          <span className="gradient-text">Decision Simulator</span>
        </h1>
        <p className="max-w-3xl mx-auto text-slate-300 text-lg">
          Run realistic what-if scenarios before committing budget, time, or headcount.
          See revenue impa
