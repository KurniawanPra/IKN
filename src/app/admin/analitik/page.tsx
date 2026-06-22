"use client";

import React from "react";
import dynamic from "next/dynamic";

const AnalyticsPanel = dynamic(() => import("@/components/admin/AnalyticsPanel"), { ssr: false });

export default function AdminAnalyticsPage() {
  return <AnalyticsPanel />;
}
