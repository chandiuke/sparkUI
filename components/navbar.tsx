"use client";

import { useState } from "react";
import { clsx } from "clsx";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@/components/ui/navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
  Logo,
} from "@/components/icons";
import { TransitionLink } from "@/components/page-transition";

export function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar maxWidth="xl" position="sticky">
      <NavbarContent justify="start" className="basis-1/5 sm:basis-full">
        <NavbarBrand>
          <TransitionLink
            className="flex items-center gap-2"
            href="/"
            activeStyle={false}
          >
            <Logo />
            <span className="font-bold text-inherit">SparkUI</span>
          </TransitionLink>
        </NavbarBrand>

        <div className="hidden lg:flex items-center gap-4 ml-4">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <TransitionLink
                className={clsx(
                  "text-foreground/80 hover:text-foreground transition-colors",
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                href={item.href}
              >
                {item.label}
              </TransitionLink>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      <NavbarContent justify="end" className="hidden sm:flex basis-1/5 sm:basis-full">
        <NavbarItem className="hidden sm:flex gap-2">
          <a
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="text-default-500 hover:text-foreground transition-colors"
          >
            <TwitterIcon className="w-5 h-5" />
          </a>
          <a
            href={siteConfig.links.discord}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Discord"
            className="text-default-500 hover:text-foreground transition-colors"
          >
            <DiscordIcon className="w-5 h-5" />
          </a>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Github"
            className="text-default-500 hover:text-foreground transition-colors"
          >
            <GithubIcon className="w-5 h-5" />
          </a>
          <ThemeSwitch />
        </NavbarItem>

        <NavbarItem className="hidden lg:flex">
          <Input
            aria-label="Search"
            placeholder="Search..."
            size="sm"
            startContent={<SearchIcon className="text-default-400 w-4 h-4" />}
            endContent={<Kbd keys={["command"]}>K</Kbd>}
          />
        </NavbarItem>

        <NavbarItem className="hidden md:flex">
          <Button
            as="a"
            href={siteConfig.links.github}
            variant="flat"
            size="sm"
            startContent={<HeartFilledIcon className="text-danger w-4 h-4" />}
          >
            Sponsor
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end" className="sm:hidden basis-1 pl-4">
        <a
          href={siteConfig.links.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Github"
          className="text-default-500 hover:text-foreground transition-colors"
        >
          <GithubIcon className="w-5 h-5" />
        </a>
        <ThemeSwitch />
        <NavbarMenuToggle isOpen={isMenuOpen} onToggle={() => setIsMenuOpen(!isMenuOpen)} />
      </NavbarContent>

      <NavbarMenu isOpen={isMenuOpen}>
        <div className="mb-4">
          <Input
            aria-label="Search"
            placeholder="Search..."
            size="md"
            startContent={<SearchIcon className="text-default-400 w-4 h-4" />}
          />
        </div>
        {siteConfig.navMenuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.href}-${index}`}>
            <TransitionLink
              className="text-lg text-foreground hover:text-primary transition-colors"
              href={item.href}
            >
              {item.label}
            </TransitionLink>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
