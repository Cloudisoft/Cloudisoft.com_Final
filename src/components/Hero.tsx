// src/components/Hero.tsx
import { Link } from "react-router-dom";
export default function Hero() {
  return (
    <section
     id="home"
  className="section text-center flex flex-col gap-8 pt-24 pb-16"
>
  {/* Animated floating icons */}
  <div className="flex justify-center gap-6 mb-4 hero-icons">
    <span className="hero-svg hero1">🧠</span>
    <span className="hero-svg hero2">✨</span>
    <span className="hero-svg hero3">⚡</span>
  </div>

      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight">
        Automate Intelligence.
        <br />
        <span className="gradient-text">Amplify Growth.</span>
      </h1>

      <p className="max-w-3xl mx-auto text-slate-300 text-lg">
        Harness the power of custom AI Agents and predictive business simulations
        to transform your operations and decision-making.
      </p>

 <div className="flex justify-center gap-4 mt-2">
  <a className="btn-primary" href="#agents">
    Explore AI Agents ✨
  </a>

  <Link className="btn-secondary" to="/cloudicore">
    Start Your Free Trial ▶
  </Link>
</div>
    </section>
  );
}
