import React from "react";
import Link from "next/link";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
];

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-md shadow-sm fixed top-0 left-0 z-50">
      {/* Logo Placeholder */}
      <div className="font-extrabold text-2xl tracking-tight text-blue-700">
        {/* Replace with your logo if available */}
        LOGO
      </div>
      <ul className="flex gap-8 text-lg font-medium">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="relative group px-2 py-1">
              <span>{link.name}</span>
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
} 