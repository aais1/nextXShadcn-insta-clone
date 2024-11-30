import { Navigation } from "@/app/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Post from "./components/Post";


export default function Home() {
  return (
    <div className="min-h-screen">
      <div>
        <Navigation />
      </div>
      <div className="mt-[20px]">
        <div className="flex  md:max-w-[calc(614px+350px)] mx-auto overflow-hidden ">
          <div className="flex-1 min-h-screen max-w-[614px] border border-white ">
            <div
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
              className="overflow-x-scroll overflow-y-hidden flex gap-x-1 py-[10px] max-w-[100%] max-h-[60px] md:px-2 bg-purple-500 border border-t-0"
            >
             {
              Array.from({length:30}).map((_, index) => (
                <Avatar key={index}>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>{"A"}</AvatarFallback>
              </Avatar>
              ))
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
          <div className="flex-none border-t border-r border-b border-white  px-2 pt-[10px] min-w-[350px] min-h-screen ">
            <div className=" flex justify-between">
              <p>Suggestions For You</p>
              <p>See All</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
