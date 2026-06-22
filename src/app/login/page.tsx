"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";

interface UserAccount {
  email: string;
  name: string;
  password?: string;
  status: string;
  createdAt: string;
}

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Helper untuk mengambil list user dari localStorage atau menginisialisasi default mock users
  const getUsers = () => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem("ikn_users");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    // Default mock users
    const defaults = [
      {
        email: "pembeli@ikn.com",
        name: "PT Karet Sejahtera",
        password: "user123",
        status: "approved",
        createdAt: "2026-06-21"
      },
      {
        email: "budi@karetindo.id",
        name: "CV Budi Mandiri",
        password: "budi123",
        status: "pending",
        createdAt: "2026-06-22"
      }
    ];
    localStorage.setItem("ikn_users", JSON.stringify(defaults));
    return defaults;
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Format email tidak valid");
      setError(true);
      setTimeout(() => setError(false), 600);
      return;
    }

    if (!password) {
      setErrorMessage("Password tidak boleh kosong");
      setError(true);
      setTimeout(() => setError(false), 600);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);

      // 1. Cek admin credentials
      const isAdmin = email === "admin@ikn.com" && password === "admin123";
      if (isAdmin) {
        localStorage.setItem("ikn_logged_in", "true");
        localStorage.setItem("ikn_user_email", email);
        localStorage.setItem("ikn_role", "admin");
        setToastMessage("Login berhasil! Mengalihkan ke Admin Panel...");
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          window.location.href = "/admin";
        }, 1000);
        return;
      }

      // 2. Cek user database dari localStorage
      const users = getUsers();
      const user = users.find((u: UserAccount) => u.email === email && u.password === password);

      if (!user) {
        setErrorMessage("Email atau password salah!");
        setError(true);
        setTimeout(() => setError(false), 600);
        return;
      }

      if (user.status === "pending") {
        setErrorMessage("Akun Anda sedang dalam proses persetujuan oleh admin.");
        setError(true);
        setTimeout(() => setError(false), 600);
        return;
      }

      if (user.status === "rejected") {
        setErrorMessage("Pendaftaran akun Anda ditolak oleh admin.");
        setError(true);
        setTimeout(() => setError(false), 600);
        return;
      }

      // Set user login
      localStorage.setItem("ikn_logged_in", "true");
      localStorage.setItem("ikn_user_email", email);
      localStorage.setItem("ikn_role", "user");
      setToastMessage("Login berhasil! Mengalihkan...");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        const params = new URLSearchParams(window.location.search);
        const redirectUrl = params.get("redirect") || "/ecommerce";
        window.location.href = redirectUrl;
      }, 1000);
    }, 1200);
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("Nama lengkap / nama perusahaan harus diisi");
      setError(true);
      setTimeout(() => setError(false), 600);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Format email tidak valid");
      setError(true);
      setTimeout(() => setError(false), 600);
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password minimal 6 karakter");
      setError(true);
      setTimeout(() => setError(false), 600);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Konfirmasi password tidak cocok");
      setError(true);
      setTimeout(() => setError(false), 600);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);

      const users = getUsers();
      const emailExists = users.some((u: UserAccount) => u.email === email) || email === "admin@ikn.com";

      if (emailExists) {
        setErrorMessage("Email tersebut sudah terdaftar!");
        setError(true);
        setTimeout(() => setError(false), 600);
        return;
      }

      const newUser = {
        name,
        email,
        password,
        status: "pending",
        createdAt: new Date().toISOString().split("T")[0]
      };

      const updatedUsers = [...users, newUser];
      localStorage.setItem("ikn_users", JSON.stringify(updatedUsers));

      setToastMessage("Pendaftaran berhasil! Akun Anda sedang menunggu persetujuan admin.");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        setIsSignUp(false); // Pindah ke form login
        setPassword("");
        setConfirmPassword("");
        setErrorMessage("");
      }, 2500);
    }, 1200);
  };

  return (
    <div className="flex min-h-screen">
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-6 left-1/2 z-50 -translate-x-1/2 rounded bg-green-600 px-6 py-3 text-sm font-medium text-white shadow-lg"
        >
          {toastMessage}
        </motion.div>
      )}

      <div className="flex w-full flex-col justify-between px-8 py-8 lg:w-1/2 lg:px-16 transition-colors duration-300" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft size={16} />
            Kembali ke Home
          </Link>
          <ThemeToggle />
        </div>

        <motion.div
          animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto w-full max-w-md my-auto py-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-3xl font-bold text-foreground">IKN</p>
            <p className="mb-6 text-sm text-muted">
              PT. Industri Karet Nusantara
            </p>
          </motion.div>

          <motion.div
            key={isSignUp ? "signup-title" : "login-title"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <h1 className="mb-2 text-2xl font-bold text-foreground">
              {isSignUp ? "Pendaftaran Akun Pembeli" : "Masuk ke Akun Anda"}
            </h1>
            <p className="text-sm text-muted">
              {isSignUp 
                ? "Daftar untuk melakukan pemesanan produk karet Nusantara" 
                : "Silakan masukkan kredensial Anda"}
            </p>
          </motion.div>

          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-4 rounded border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-400 font-medium"
            >
              {errorMessage}
            </motion.div>
          )}

          <form onSubmit={isSignUp ? handleSignUpSubmit : handleLoginSubmit} className="space-y-4">
            {isSignUp && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-1.5"
              >
                <label className="block text-sm font-medium text-foreground">
                  Nama Lengkap / Perusahaan
                </label>
                <div className="relative">
                  <User
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-dim"
                  />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: PT Karet Unggul"
                    className="w-full rounded-sm py-2.5 pl-10 pr-4 theme-input text-sm"
                  />
                </div>
              </motion.div>
            )}

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-foreground">
                Email
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-dim"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full rounded-sm py-2.5 pl-10 pr-4 theme-input text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-foreground">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-dim"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-sm py-2.5 pl-10 pr-12 theme-input text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-dim hover:text-muted"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {isSignUp && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-1.5"
              >
                <label className="block text-sm font-medium text-foreground">
                  Konfirmasi Password
                </label>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-dim"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-sm py-2.5 pl-10 pr-12 theme-input text-sm"
                  />
                </div>
              </motion.div>
            )}

            {!isSignUp && (
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 rounded-sm border-border bg-elevated"
                  />
                  <label htmlFor="remember" className="text-sm text-muted">
                    Ingat saya
                  </label>
                </div>
                <span className="cursor-pointer text-xs text-accent hover:underline">
                  Lupa password?
                </span>
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center rounded py-2.5 font-medium text-white transition-colors disabled:opacity-70 btn-primary text-sm shadow-md"
              >
                {isLoading ? (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                  isSignUp ? "Daftar Akun" : "Masuk"
                )}
              </button>
            </div>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setErrorMessage("");
                  setName("");
                  setPassword("");
                  setConfirmPassword("");
                }}
                className="text-xs text-accent hover:underline font-medium"
              >
                {isSignUp 
                  ? "Sudah memiliki akun? Masuk di sini" 
                  : "Belum memiliki akun pembeli? Daftar sekarang"}
              </button>
            </div>
          </form>
        </motion.div>

        <div />
      </div>

      <div className="relative hidden items-center justify-center overflow-hidden lg:flex lg:w-1/2 transition-colors duration-300" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="absolute left-1/4 top-1/3 h-96 w-96 rounded-full blur-3xl" style={{ background: 'var(--accent-glow)' }} />
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full blur-3xl" style={{ background: 'var(--accent-glow)' }} />
        <div className="absolute right-1/3 top-1/2 h-80 w-80 rounded-full blur-3xl" style={{ background: 'var(--accent-glow)' }} />
        <div className="relative z-10 flex flex-col items-center">
          <span className="text-8xl font-bold text-accent/20">IKN</span>
        </div>
        <p className="absolute bottom-12 left-0 right-0 text-center text-sm text-muted/30">
          Well-Established Rubber-Based Downstream Company Since 1965
        </p>
      </div>
    </div>
  );
}
