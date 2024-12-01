"use client";
import * as React from "react";
import { ModeToggle } from "./ModeToggle";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Logo from "./insta-logo.png";
import { useTheme } from "next-themes";
import LogoWhite from "./insta-logo-white.png";
import { Button } from "@/components/ui/button";
import { House, LogOut } from "lucide-react";
import { Mail } from "lucide-react";
import { Search } from "lucide-react";
import { DiamondPlus } from "lucide-react";
import { Compass } from "lucide-react";
import { Heart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  NavigationMenuLink
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useShowAddPostModalContext } from "../contexts/ShowAddPostModal";
import NewPostModal from "./NewPostModal";

export function Navigation() {
  const { theme } = useTheme();
  const data= useSession();
 
  const loggedIn = data?.data?.user ? true : false;
  const router=useRouter();
  const {showAddPostModal,setShowAddPostModal}=useShowAddPostModalContext();

  return (
    <div className="">
      {
        showAddPostModal && <NewPostModal/>
      }
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
     

      <div className="flex items-center gap-x-[1px] md:gap-x-2">
      {loggedIn && (
        <div className="flex items-center gap-x-[7.5px] md:gap-x-[22px]">
          {/* Home Icon with Tooltip */}
          <Link href="/">
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
          </Link>

          {/* Mail Icon with Tooltip */}
          <Link href="/messaging">
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
          </Link>

          {/* Search Icon with Tooltip */}
          <Link href="/search">
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
          </Link>

          {/* Add Post Icon with Tooltip */}
          <button onClick={()=>{
            console.log(showAddPostModal)
            setShowAddPostModal(!showAddPostModal)
          }}>
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
          </button>
          

          {/* Explore Icon with Tooltip */}
          <Link href="/explore">
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
          </Link>

          {/* Liked Posts Icon with Tooltip */}
          <Link href="/liked">
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
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={ data?.data?.user?.image ||"https://github.com/shadcn.png"} />
                <AvatarFallback>{"A"}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-center">
              <DropdownMenuLabel>{data?.data?.user?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={()=>{
                signOut()
                router.push("/sign-in")
              }} className="text-center">Logout <LogOut/></DropdownMenuItem>
              <DropdownMenuItem className="text-center">Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
        {!loggedIn &&<> <Button onClick={()=>{
          signIn()
        }}>Login</Button>
        </>}
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
