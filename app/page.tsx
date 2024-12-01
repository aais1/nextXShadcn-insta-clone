"use client"
import { Navigation } from "@/app/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Post from "./components/Post";
import { useSession } from "next-auth/react";


export default function Home() {
  const {data}=useSession();
  return (
    <div className="min-h-screen">
      <div className="mt-[20px]">
        <div className="flex max-w-[calc(614px+350px)] mx-auto overflow-hidden ">
          <div className="flex-1 w-screen  min-h-screen md:max-w-[614px] border border-white ">
            <div
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
              className="overflow-x-scroll overflow-y-hidden flex gap-x-1 py-[10px] max-w-[100%] min-h-[60px] md:px-2 bg-purple-500 border border-t-0"
            >
              {
                data?.user &&
                <Avatar  className="size-[70px] cursor-pointer  border-[3px] border-red-500 ">
                <AvatarImage src={data?.user?.image ||  data?.user?.name?.charAt(0).toUpperCase()  } />
                <AvatarFallback>{data?.user?.name?.charAt(0).toUpperCase() }</AvatarFallback>
              </Avatar>
              }
             {
              data?.user ?(
              Array.from({length:30}).map((_, index) => (
                <Avatar  className="size-[70px] cursor-pointer  border-[3px] border-red-500 " key={index}>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>{"A"}</AvatarFallback>
              </Avatar>
              )))
              :(
                <p className="font-semibold min-w-[100%] flex items-center justify-center">Login to see stories 🙊</p>
              )
             }
            </div>
          
            {/* POSTS COME HERE */}
            <div className="flex flex-col gap-y-2">
              {
                Array.from({length:5}).map((_, index) => (
                  <Post key={index}/>
                ))
              }
  
            </div>
            <div>

            </div>
          </div>
          <div className="flex-none border-t border-r border-b border-white  px-2 pt-[10px] hidden md:block md:min-w-[350px] min-h-screen ">
            <div className="flex justify-between">
              <p>Suggestions For You</p>
              <p>See All</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
