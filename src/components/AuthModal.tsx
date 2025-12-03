import { useState } from "react";

export default function AuthModal({ open, onClose }: any) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm z-[999]">
      <div className="bg-cloudi-card rounded-3xl p-8 w-[380px] border border-slate-800 shadow-xl shadow-black/50">
        
        <h2 className="text-2xl font-bold text-center mb-4">Welcome ✨</h2>

        <p className="text-sm text-slate-300 mb-5 text-center">
          Create an account to save simulations & get dashboards.
        </p>

        <div className="flex flex-col gap-2">
          <button className="btn-secondary w-full">Continue with Google</button>
          <button className="btn-secondary w-full">Continue with Microsoft</button>
        </div>

        <div className="text-center text-xs my-4 text-slate-500">OR</div>

        <input
          placeholder="Work email"
          className="w-full bg-cloudi-card/60 rounded-xl p-3 border border-slate-800 mt-1 text-sm"
        />
        <input
          placeholder="Password"
          className="w-full bg-cloudi-card/60 rounded-xl p-3 border border-slate-800 mt-2 text-sm"
          type="password"
        />

        <button className="btn-primary w-full mt-4">Create Account</button>

        <p
          className="mt-4 text-slate-400 text-center text-sm cursor-pointer"
          onClick={onClose}
        >
          Close
        </p>
      </div>
    </div>
  );
}
