import React from "react";
import { Heart, MessageCircle, MoreHorizontal, Send , Trash2 , Bookmark } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PostImage from "./Post-Img.png";


const Post = () => {
  return (
    <div className="py-4 flex flex-col  border border-white">
      <div className="flex px-4 mb-4 items-center justify-between">
        <div className="flex  items-center gap-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>{"A"}</AvatarFallback>
          </Avatar>
          <p className="font-semibold">Ali Aais</p>
        </div>
        <div className="cursor-pointer">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreHorizontal />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-center">
              <DropdownMenuItem className="text-center">Info</DropdownMenuItem>
              <DropdownMenuItem  className="text-center text-red-500 font-semibold">
                Delete <Trash2 />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {
        // content
        <Image
          src={PostImage}
          className="md:w-[654px] w-full h-[400px] mx-auto md:h-[614px]"
          alt="user upload"
          width={654}
          height={614}
        />
      }
      <div className="px-4 py-4 flex items-center justify-between">
        <div className="flex gap-x-[16px] items-center">
            <Heart className="cursor-pointer" />
            <MessageCircle className="cursor-pointer"/>
            <Send className="cursor-pointer"/>
        </div>
        <div>
        <Bookmark className="cursor-pointer" />
        </div>
      </div>

      <div className="px-4">
        <p className="pb-2">1000 Likes</p>
        <p> <span className="font-semibold">Ali Aais</span> <span>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id repellat cum asperiores hic, explicabo inventor .... <span className="underline cursor-pointer font-semibold">See More</span></span></p>
        <span className="text-sm inline-block pt-2 hover:underline cursor-pointer">View all {'100'} comments</span>
        <p className="text-sm py-1">1 {"hour"} ago</p>
      </div>
    </div>
  );
};

export default Post;
