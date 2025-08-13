"use client";

import { Authenticated } from "convex/react";
import dynamic from "next/dynamic";
const ThemeToggle = dynamic(() => import("@/components/ui/theme-toggle"), { ssr: false });
import React from "react";

const MainLayout = ({ children }) => {
  return (
    <Authenticated>
      <div className="container mx-auto mt-24 mb-20 px-4">
        <div className="fixed bottom-6 right-6 z-40">
          <ThemeToggle />
        </div>
        {children}
      </div>
    </Authenticated>
  );
};

export default MainLayout;
