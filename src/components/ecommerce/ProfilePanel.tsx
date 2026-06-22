"use client";

import React from "react";

interface ProfilePanelProps {
  displayName: string;
  userEmail: string;
  avatarInitial: string;
  onLogout: () => void;
}

export default function ProfilePanel({ displayName, userEmail, avatarInitial, onLogout }: ProfilePanelProps) {
  return (
    <div className="glass-panel rounded-xl border border-border p-6 w-full max-w-full">
      <h2 className="text-base font-bold text-foreground mb-4">Profil Akun</h2>
      <div className="flex items-center gap-4 mb-5">
        <span className="w-14 h-14 rounded-full bg-accent/15 border-2 border-accent/30 flex items-center justify-center text-accent text-2xl font-bold">
          {avatarInitial}
        </span>
        <div>
          <p className="font-bold text-foreground">{displayName}</p>
          <p className="text-xs text-muted font-mono">{userEmail}</p>
          <span className="inline-flex items-center gap-1 mt-1.5 text-[10px] text-green-500 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-sm font-mono uppercase">
            ✓ B2B Verified
          </span>
        </div>
      </div>
      <div className="border-t border-border/30 pt-4 space-y-3 text-xs text-muted">
        <div className="flex justify-between">
          <span>Email</span>
          <span className="font-mono text-foreground">{userEmail}</span>
        </div>
        <div className="flex justify-between">
          <span>Role</span>
          <span className="font-mono text-foreground">B2B Buyer</span>
        </div>
        <div className="flex justify-between">
          <span>Platform</span>
          <span className="font-mono text-foreground">IKN E-Commerce</span>
        </div>
      </div>
      <button
        onClick={onLogout}
        className="mt-6 w-full py-2 border border-red-500/30 text-red-400 hover:bg-red-500/10 rounded text-xs font-semibold transition"
      >
        Logout
      </button>
    </div>
  );
}
