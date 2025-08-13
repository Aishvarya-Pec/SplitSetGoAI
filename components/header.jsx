"use client";

import React from "react";
import { Button } from "./ui/button";
import { LayoutDashboard } from "lucide-react";
import dynamic from "next/dynamic";
const ThemeToggle = dynamic(() => import("./ui/theme-toggle"), { ssr: false });
import Link from "next/link";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { useStoreUser } from "@/hooks/use-store-user";
import { BarLoader } from "react-spinners";
import { Authenticated, Unauthenticated } from "convex/react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const { isLoading } = useStoreUser();
  const path = usePathname();

  return (
    <header className="fixed top-0 w-full border-b bg-white/80 backdrop-blur z-50 supports-[backdrop-filter]:bg-white/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="relative h-16 w-64 overflow-hidden">
            <Image
              src={"/logos/logo.png"}
              alt="SplitSetGO Logo"
              fill
              className="object-cover object-left"
              priority
            />
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {path === "/" ? (
            <>
              <Link
                href="#features"
                className="text-sm font-medium text-gray-600 hover:text-[#22C55E] transition"
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-sm font-medium text-gray-600 hover:text-[#22C55E] transition"
              >
                How It Works
              </Link>
            </>
          ) : null}
          <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-[#22C55E] transition">About</Link>
          <Link href="/faq" className="text-sm font-medium text-gray-600 hover:text-[#22C55E] transition">FAQ</Link>
          <Link href="/contact" className="text-sm font-medium text-gray-600 hover:text-[#22C55E] transition">Contact</Link>
        </div>

        <div className="flex items-center gap-4">
          <Authenticated>
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="hidden md:inline-flex items-center gap-2 hover:text-[#22C55E] hover:border-[#22C55E] transition"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Button>
              <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                <LayoutDashboard className="h-4 w-4" />
              </Button>
            </Link>

            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
              afterSignOutUrl="/"
            />
          </Authenticated>

          <Unauthenticated>
            <SignInButton>
              <Button variant="ghost">Sign In</Button>
            </SignInButton>

            <SignUpButton>
              <Button className="bg-[#22C55E] hover:bg-[#16a34a] border-none shadow-md hover:shadow-lg">
                Get Started
              </Button>
            </SignUpButton>
          </Unauthenticated>
          <div className="hidden md:block ml-2">
            <ThemeToggle />
          </div>
        </div>
      </nav>
      {isLoading && <BarLoader width={"100%"} color="#22C55E" />}
    </header>
  );
}
