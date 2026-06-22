"use client";

import React, { useEffect, useState } from "react";
import SkeletonLoader from "@/components/ui/skeleton-loader";
import SettingsPanel from "@/components/admin/settings/SettingsPanel";

export default function AdminSettingsPage() {
  const [isClient, setIsClient] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    setIsClient(true);
    setUserEmail(localStorage.getItem("ikn_user_email") || "admin@ikn.com");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("ikn_logged_in");
    localStorage.removeItem("ikn_user_email");
    localStorage.removeItem("ikn_role");
    window.location.href = "/";
  };

  if (!isClient) {
    return (
      <div className="flex items-center justify-center p-12">
        <SkeletonLoader type="grid" />
      </div>
    );
  }

  return <SettingsPanel userEmail={userEmail} onLogout={handleLogout} />;
}
