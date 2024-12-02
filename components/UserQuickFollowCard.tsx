import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserQuickFollowCard(){
    return (
        <div className="flex justify-between items-center px-3">
            <div className="flex gap-x-2">
              <Avatar  className="size-[50px] cursor-pointer  border-[3px] border-red-500 ">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>{"L"}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-y-[2px]">
                <p>Ali Aais</p>
                <p className="text-xs">You may know them</p>
              </div>
                </div>
              <button className="text-blue-500 font-semobold">
                Follow
              </button>
              </div>
    )
}