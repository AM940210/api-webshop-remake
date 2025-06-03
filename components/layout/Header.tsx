"use client";

import { cn } from "@/lib/utils";
import { Dancing_Script } from "next/font/google";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400"], // Välj vilken vikt du vill (ex: 400 eller 700)
});

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import ShoppingCart from "./ShoppingCart";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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
          <Link
            href="/"
            className="text-foreground/80 hover:text-foreground transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            data-cy="admin-link"
            href="/admin"
            className="text-foreground/80 hover:text-foreground transition-colors duration-200"
          >
            Admin
          </Link>
          <Link
            href="/not-found"
            className="text-foreground/80 hover:text-foreground transition-colors duration-200"
          >
            Contact
          </Link>
          <Link
            href="/not-found"
            className="text-foreground/80 hover:text-foreground transition-colors duration-200"
          >
            About
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link data-cy="cart-link" href="/checkout">
            <ShoppingCart />
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg shadow-lg animate-fade-in">
          <nav className="container mx-auto px-4 py-6 flex flex-col space-y-4">
            <Link
              href="/"
              className="text-lg py-2 px-4 hover:bg-secondary rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              data-cy="admin-link"
              href="/admin"
              className="text-lg py-2 px-4 hover:bg-secondary rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Admin
            </Link>
            <Link
              href="/not-found"
              className="text-lg py-2 px-4 hover:bg-secondary rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/not-found"
              className="text-lg py-2 px-4 hover:bg-secondary rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
