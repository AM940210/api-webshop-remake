"use client";

import { cn } from "@/lib/utils";
import { Dancing_Script } from "next/font/google";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import ShoppingCart from "./ShoppingCart";
import { authClient } from "@/lib/auth-client";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Image from "next/image";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400"],
});

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMounted(true);

    const fetchSession = async () => {
      const { data } = await authClient.getSession();
      setSession(data);

      if (data?.user?.email) {
        // Spara användaren i databasen
        try {
          const res = await fetch("/api/save-user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: data.user.name,
              email: data.user.email,
              image: data.user.image,
            }),
          });

          const userData = await res.json();
          if (userData?.isAdmin === true) {
            setIsAdmin(true);
          }
        } catch (err) {
          console.error("Kunde inte spara användaren:", err);
        }
      }
    };

    fetchSession();
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSignIn = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    setSession(null);
    setIsAdmin(false);
  };

  if (!isMounted) return null;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        {
          "py-4": !isScrolled,
          "py-2 bg-background/80 backdrop-blur-lg shadow-sm": isScrolled,
        }
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link
          href="/"
          className={cn(
            "text-4xl font-bold tracking-tight transition-opacity duration-200 hover:opacity-80",
            dancingScript.className
          )}
        >
          MAST
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-foreground/80 hover:text-foreground">Home</Link>
          {isAdmin && (
            <Link data-cy="admin-link" href="/admin" className="text-foreground/80 hover:text-foreground">Admin</Link>
          )}
          <Link href="/not-found" className="text-foreground/80 hover:text-foreground">Contact</Link>
          <Link href="/not-found" className="text-foreground/80 hover:text-foreground">About</Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link data-cy="cart-link" href="/checkout">
            <ShoppingCart />
          </Link>

          {session ? (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button
                  className="rounded-full w-9 h-9 overflow-hidden border border-gray-300 hover:ring-2 ring-primary transition"
                  aria-label="Användarprofil"
                >
                  <Image
                    src={session.user?.image ?? "/placeholder.png"}
                    alt="Profilbild"
                    width={36}
                    height={36}
                    className="object-cover w-full h-full"
                  />
                </button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  align="end"
                  sideOffset={8}
                  className="z-50 w-32 bg-white dark:bg-background border rounded-md shadow-lg p-1 text-sm"
                >
                  <DropdownMenu.Item
                    onClick={handleSignOut}
                    className="w-full px-3 py-2 hover:bg-muted text-foreground rounded-md cursor-pointer transition-colors"
                  >
                    Logga ut
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          ) : (
            <Button variant="default" onClick={handleSignIn}>
              Logga in
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg shadow-lg animate-fade-in">
          <nav className="container mx-auto px-4 py-6 flex flex-col space-y-4">
            <Link href="/" className="text-lg py-2 px-4 hover:bg-secondary rounded-md" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            {isAdmin && (
              <Link href="/admin" className="text-lg py-2 px-4 hover:bg-secondary rounded-md" onClick={() => setIsMobileMenuOpen(false)}>Admin</Link>
            )}
            <Link href="/not-found" className="text-lg py-2 px-4 hover:bg-secondary rounded-md" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
            <Link href="/not-found" className="text-lg py-2 px-4 hover:bg-secondary rounded-md" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
