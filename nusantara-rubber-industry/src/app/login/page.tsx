"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(true);
      setTimeout(() => setError(false), 600);
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen">
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-6 left-1/2 z-50 -translate-x-1/2 rounded-sm bg-green-600 px-6 py-3 text-sm font-medium text-white shadow-lg"
        >
          Login berhasil (demo)
        </motion.div>
      )}

      <div className="flex w-full flex-col justify-between bg-[#142040] px-8 py-8 lg:w-1/2 lg:px-16">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-[#c0c0c0] transition-colors hover:text-[#f0f0ec]"
        >
          <ArrowLeft size={16} />
          Kembali ke Home
        </Link>

        <motion.div
          animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto w-full max-w-md"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-3xl font-bold text-[#f0f0ec]">IKN</p>
            <p className="mb-8 text-sm text-[#c0c0c0]">
              PT. Industri Karet Nusantara
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="mb-2 text-2xl font-bold text-[#f0f0ec]">
              Masuk ke Akun Anda
            </h1>
            <p className="mb-8 text-sm text-[#c0c0c0]">
              Silakan masukkan kredensial Anda
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="mb-1.5 block text-sm font-medium text-[#f0f0ec]">
                Email
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c0c0c0]/50"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full rounded-sm border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-[#f0f0ec] placeholder:text-[#c0c0c0]/50 focus:border-[#8b1a1a]/50 focus:outline-none"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="mb-1.5 block text-sm font-medium text-[#f0f0ec]">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c0c0c0]/50"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-sm border border-white/10 bg-white/5 py-3 pl-10 pr-12 text-[#f0f0ec] placeholder:text-[#c0c0c0]/50 focus:border-[#8b1a1a]/50 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#c0c0c0]/50 hover:text-[#c0c0c0]"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2"
            >
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 rounded-sm border-white/10 bg-white/5"
              />
              <label htmlFor="remember" className="text-sm text-[#c0c0c0]">
                Ingat saya
              </label>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center rounded-sm bg-[#8b1a1a] py-3 font-medium text-white transition-colors hover:bg-[#8b1a1a]/90 disabled:opacity-70"
              >
                {isLoading ? (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                  "Masuk"
                )}
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-center"
            >
              <span className="cursor-pointer text-sm text-[#8b1a1a] hover:underline">
                Lupa password?
              </span>
            </motion.div>
          </form>
        </motion.div>

        <div />
      </div>

      <div className="relative hidden items-center justify-center overflow-hidden bg-[#0a1628] lg:flex lg:w-1/2">
        <div className="absolute left-1/4 top-1/3 h-96 w-96 rounded-full bg-[#8b1a1a]/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-[#8b1a1a]/5 blur-3xl" />
        <div className="absolute right-1/3 top-1/2 h-80 w-80 rounded-full bg-[#8b1a1a]/5 blur-3xl" />
        <div className="relative z-10 flex flex-col items-center">
          <span className="text-8xl font-bold text-[#8b1a1a]/20">IKN</span>
        </div>
        <p className="absolute bottom-12 left-0 right-0 text-center text-sm text-[#c0c0c0]/30">
          Well-Established Rubber-Based Downstream Company Since 1965
        </p>
      </div>
    </div>
  );
}
