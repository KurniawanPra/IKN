"use client";

import React from "react";
import dynamic from "next/dynamic";

const CustomersPanel = dynamic(() => import("@/components/admin/CustomersPanel"), { ssr: false });

export default function AdminCustomersPage() {
  return <CustomersPanel />;
}
