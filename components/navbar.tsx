"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  SearchIcon,
} from "@/components/icons";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, type: "spring" }}
    >
      <HeroUINavbar
        maxWidth="xl"
        position="static"
        className={clsx(
          "transition-all duration-500",
          isScrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-[#dfeoe2] shadow-lg"
            : "bg-transparent"
        )}
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink className="flex justify-start items-center gap-2" href="/">
              <motion.div
                className="w-10 h-10 bg-gradient-to-br from-[#2d4f4a] to-[#8db1a4] rounded-lg flex items-center justify-center"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <span className="text-white font-bold text-lg">D</span>
              </motion.div>
              <motion.p
                className="font-bold text-xl text-[#0a0f1d] tracking-wide"
                whileHover={{ scale: 1.02 }}
              >
                DIGIVO
              </motion.p>
            </NextLink>
          </NavbarBrand>
          
          <ul className="hidden lg:flex gap-6 justify-start ml-8">
            {siteConfig.navItems.map((item, index) => (
              <NavbarItem key={item.href}>
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  whileHover={{ y: -2 }}
                >
                  <NextLink
                    className={clsx(
                      linkStyles({ color: "foreground" }),
                      "text-[#787a84] hover:text-[#2d4f4a] font-medium transition-colors duration-300 relative group"
                    )}
                    href={item.href}
                  >
                    {item.label}
                    <motion.div
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#8db1a4] group-hover:w-full transition-all duration-300"
                    />
                  </NextLink>
                </motion.div>
              </NavbarItem>
            ))}
          </ul>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
          <NavbarItem className="hidden sm:flex gap-3">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link
                isExternal
                aria-label="Twitter"
                href={siteConfig.links.twitter}
                className="text-[#787a84] hover:text-[#2d4f4a] transition-colors"
              >
                <TwitterIcon className="text-default-500" />
              </Link>
            </motion.div>
       
            
      
            
            <ThemeSwitch />
          </NavbarItem>
  
          <NavbarItem className="hidden md:flex">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                as={Link}
                href="/contact"
                className="bg-[#2d4f4a] text-white hover:bg-[#8db1a4] font-semibold transition-colors duration-300"
                radius="lg"
                variant="solid"
              >
                Get Started
              </Button>
            </motion.div>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
          <ThemeSwitch />
          <NavbarMenuToggle />
        </NavbarContent>

      </HeroUINavbar>
    </motion.div>
  );
};