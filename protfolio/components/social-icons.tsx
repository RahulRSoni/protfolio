import React from "react";
import { FaLinkedin, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

const socials = [
  {
    name: "LinkedIn",
    href: "https://linkedin.com/",
    icon: FaLinkedin,
    color: "text-blue-700 hover:text-blue-500",
  },
  {
    name: "Twitter",
    href: "https://twitter.com/",
    icon: FaTwitter,
    color: "text-sky-500 hover:text-sky-400",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/",
    icon: FaInstagram,
    color: "text-pink-500 hover:text-pink-400",
  },
  {
    name: "GitHub",
    href: "https://github.com/",
    icon: FaGithub,
    color: "text-gray-800 hover:text-primary",
  },
];

export default function SocialIcons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex gap-4 ${className}`}>
      {socials.map(({ name, href, icon: Icon, color }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={name}
          className={`text-2xl transition-transform transform hover:scale-125 icon-bounce ${color}`}
        >
          <Icon />
        </a>
      ))}
    </div>
  );
} 