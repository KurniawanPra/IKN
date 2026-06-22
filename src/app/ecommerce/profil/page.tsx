"use client";

import React, { useEffect, useState } from "react";
import SkeletonLoader from "@/components/ui/skeleton-loader";
import ProfilePanel from "@/components/ecommerce/ProfilePanel";

export default function EcommerceProfilePage() {
  const [isClient, setIsClient] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    setIsClient(true);
    setUserEmail(localStorage.getItem("ikn_user_email") || "");
  }, []);

  const displayName = userEmail
    ? userEmail.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "Pengguna";
  const avatarInitial = displayName.charAt(0).toUpperCase();

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

  return (
    <ProfilePanel
      displayName={displayName}
      userEmail={userEmail}
      avatarInitial={avatarInitial}
      onLogout={handleLogout}
    />
  );
}
