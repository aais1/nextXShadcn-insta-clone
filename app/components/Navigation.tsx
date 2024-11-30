"use client";
import * as React from "react";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Logo from "./insta-logo.png";
import { useTheme } from "next-themes";
import LogoWhite from "./insta-logo-white.png";
import { Button } from "@/components/ui/button";
import { House } from "lucide-react";
import { Mail } from "lucide-react";
import { Search } from "lucide-react";
import { DiamondPlus } from "lucide-react";
import { Compass } from "lucide-react";
import { Heart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "User Profile",
    href: "/docs/features/user-profile",
    description: "Manage user information, preferences, and privacy settings.",
  },
  {
    title: "Notifications",
    href: "/docs/features/notifications",
    description: "Customize and manage notifications for different activities.",
  },
  {
    title: "Payment Integration",
    href: "/docs/features/payment-integration",
    description:
      "Securely handle payment processing with various payment gateways.",
  },
  {
    title: "User Authentication",
    href: "/docs/features/user-authentication",
    description: "Implement login, registration, and password management.",
  },
  {
    title: "Data Analytics",
    href: "/docs/features/data-analytics",
    description: "View and analyze user data, reports, and activity metrics.",
  },
  {
    title: "Security Settings",
    href: "/docs/features/security-settings",
    description:
      "Configure security features such as two-factor authentication and encryption.",
  },
];

export function Navigation() {
  const { theme } = useTheme();
  const loggedIn = true;

  return (
    <div className="">
    <div className="flex items-center justify-between md:w-[calc(614px+350px)] mx-auto md:px-0 px-1 ">
      <div className="cursor-pointer">
        <Link href="/">
        {theme !== "light" ? (
          <Image src={LogoWhite} width={100} height={120} alt="Insta" />
        ) : (
          <Image src={Logo} width={100} height={80} alt="Insta" />
        )}
        </Link>
      </div>
      {/* <NavigationMenu className="hidden md:flex items-center">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Features</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Full Documentation
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
      </NavigationMenu> */}
      

      <div className="flex items-center gap-x-[1px] md:gap-x-2">
      {loggedIn && (
        <div className="flex items-center gap-x-[7.5px] md:gap-x-[22px]">
          {/* Home Icon with Tooltip */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-pointer">
                  <House className="transition-transform transform hover:scale-110" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Home</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Mail Icon with Tooltip */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-pointer">
                  <Mail className="transition-transform transform hover:scale-110" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Send a Message</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Search Icon with Tooltip */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-pointer">
                  <Search className="transition-transform transform hover:scale-110" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Search</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Add Post Icon with Tooltip */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-pointer">
                  <DiamondPlus className="transition-transform transform hover:scale-110" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add a Post</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Explore Icon with Tooltip */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-pointer">
                  <Compass className="transition-transform transform hover:scale-110" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Explore</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Liked Posts Icon with Tooltip */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-pointer">
                  <Heart className="transition-transform transform hover:scale-110" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Liked Posts</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>{"A"}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-center">
              <DropdownMenuLabel>Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center">Logout</DropdownMenuItem>
              <DropdownMenuItem className="text-center">Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
        {!loggedIn && <Button>Login</Button>}
        <ModeToggle />
      </div>
    </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
