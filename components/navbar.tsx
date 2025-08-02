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
import { useTheme } from "next-themes";
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
  const [mounted, setMounted] = useState(false);
  const { theme, systemTheme } = useTheme();

  // Ensure component is mounted before accessing theme
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get current theme
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';

  // Prevent hydration mismatch
  if (!mounted) return null;

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-white/10 dark:bg-black/20 backdrop-blur-md border border-[#8db1a4]/20 dark:border-[#8db1a4]/30",
        input: "text-sm text-[#0a0f1d] dark:text-white placeholder:text-[#787a84] dark:placeholder:text-[#b8bcc3]",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block bg-[#8db1a4]/20 dark:bg-[#8db1a4]/30 text-[#2d4f4a] dark:text-[#8db1a4]" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-[#787a84] dark:text-[#b8bcc3] pointer-events-none flex-shrink-0" />
      }
      type="search"
      radius="lg"
    />
  );

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
            ? "bg-white/95 dark:bg-[#0a0f1d]/95 backdrop-blur-xl border-b border-[#dfeoe2] dark:border-[#2d4f4a] shadow-lg dark:shadow-xl dark:shadow-black/20"
            : "bg-white/10 dark:bg-[#0a0f1d]/80 backdrop-blur-md border-b border-white/10 dark:border-[#2d4f4a]/50"
        )}
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink className="flex justify-start items-center gap-2" href="/">
              <motion.div
                className="w-10 h-10 bg-gradient-to-br from-[#2d4f4a] to-[#8db1a4] dark:from-[#8db1a4] dark:to-[#2d4f4a] rounded-lg flex items-center justify-center shadow-lg dark:shadow-[#8db1a4]/20"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <span className="text-white dark:text-[#0a0f1d] font-bold text-lg transition-colors duration-300">
                  D
                </span>
              </motion.div>
              <motion.p
                className="font-bold text-xl text-[#0a0f1d] dark:text-white tracking-wide transition-colors duration-300"
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
                      "text-[#787a84] dark:text-[#b8bcc3] hover:text-[#2d4f4a] dark:hover:text-[#8db1a4] font-medium transition-colors duration-300 relative group"
                    )}
                    href={item.href}
                  >
                    {item.label}
                    <motion.div
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#8db1a4] dark:bg-[#8db1a4] group-hover:w-full transition-all duration-300"
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
                className="text-[#787a84] dark:text-[#b8bcc3] hover:text-[#2d4f4a] dark:hover:text-[#8db1a4] transition-colors duration-300"
              >
                <TwitterIcon className="text-default-500 dark:text-[#b8bcc3]" />
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link
                isExternal
                aria-label="Discord"
                href={siteConfig.links.discord}
                className="text-[#787a84] dark:text-[#b8bcc3] hover:text-[#2d4f4a] dark:hover:text-[#8db1a4] transition-colors duration-300"
              >
                <DiscordIcon className="text-default-500 dark:text-[#b8bcc3]" />
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link
                isExternal
                aria-label="Github"
                href={siteConfig.links.github}
                className="text-[#787a84] dark:text-[#b8bcc3] hover:text-[#2d4f4a] dark:hover:text-[#8db1a4] transition-colors duration-300"
              >
                <GithubIcon className="text-default-500 dark:text-[#b8bcc3]" />
              </Link>
            </motion.div>
            
            <ThemeSwitch />
          </NavbarItem>
          
          <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
          
          <NavbarItem className="hidden md:flex">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                as={Link}
                href="/contact"
                className="bg-[#2d4f4a] dark:bg-[#8db1a4] text-white dark:text-[#0a0f1d] hover:bg-[#8db1a4] dark:hover:bg-[#2d4f4a] hover:text-white dark:hover:text-white font-semibold transition-all duration-300 shadow-lg dark:shadow-[#8db1a4]/20"
                radius="lg"
                variant="solid"
              >
                Get Started
              </Button>
            </motion.div>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
          <Link
            isExternal
            aria-label="Github"
            href={siteConfig.links.github}
            className="text-[#787a84] dark:text-[#b8bcc3] hover:text-[#2d4f4a] dark:hover:text-[#8db1a4] transition-colors duration-300"
          >
            <GithubIcon className="text-default-500 dark:text-[#b8bcc3]" />
          </Link>
          <ThemeSwitch />
          <NavbarMenuToggle className="text-[#787a84] dark:text-[#b8bcc3] hover:text-[#2d4f4a] dark:hover:text-[#8db1a4]" />
        </NavbarContent>

        <NavbarMenu className="bg-white/95 dark:bg-[#0a0f1d]/95 backdrop-blur-xl pt-6 border-r border-[#dfeoe2] dark:border-[#2d4f4a] transition-colors duration-500">
          {searchInput}
          <div className="mx-4 mt-6 flex flex-col gap-4">
            {siteConfig.navMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item.label}-${index}`}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    className={clsx(
                      "w-full text-lg font-medium transition-colors duration-300",
                      index === 2
                        ? "text-[#2d4f4a] dark:text-[#8db1a4]"
                        : index === siteConfig.navMenuItems.length - 1
                          ? "text-red-500 dark:text-red-400"
                          : "text-[#787a84] dark:text-[#b8bcc3] hover:text-[#2d4f4a] dark:hover:text-[#8db1a4]"
                    )}
                    href={item.href}
                    size="lg"
                    onPress={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              </NavbarMenuItem>
            ))}
          </div>
        </NavbarMenu>
      </HeroUINavbar>
    </motion.div>
  );
};