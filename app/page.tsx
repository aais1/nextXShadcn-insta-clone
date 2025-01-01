"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Post from "./components/Post";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { UserQuickFollowCard } from "@/components/UserQuickFollowCard"
import PostSkeleton from "@/components/PostSkeleton";

export default function Home() {
  const {data }=useSession();
  const [ posts ,setPosts ] = useState([]);
  const [loading,setLoading]=useState(true);
  console.log(data)

  useEffect(() => {
    const fetchData=async()=>{
      setLoading(true)
      try {
        const response=await fetch('/api/posts',{
          credentials: 'include'
        });
        const data=await response.json();
        setPosts(data.posts)
        setLoading(false)
      } catch  {
        setLoading(false)
      }
    }
    fetchData();
  },[data])
  return (
    <div className="min-h-screen">
      <div className="mt-[20px]">
        <div className="flex md:max-w-[calc(614px+350px)] mx-auto overflow-hidden ">
          <div className="flex-1 w-full  min-h-screen md:max-w-[614px] border border-white ">
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
            {
              loading ?<>
                {
                  Array.from({length:2}).map((_,index)=>(
                    <PostSkeleton key={index}/>
                  ))
                }
              </> :
              <div className="flex flex-col gap-y-2">
              {
                posts.map((post:any, index:number) => (
                  <Post key={post._id} {...post}/>
                ))
              }
            </div>
            }
            <div>

            </div>
          </div>
          <div className="flex-none border-t border-r border-b border-white  px-2 pt-[10px] hidden md:block md:min-w-[350px] min-h-screen ">
            <div className="flex justify-between">
              <p>Suggestions For You</p>
              <p className="hover:underline cursor-pointer">See All</p>
            </div>
            <div className="flex sticky top-4 flex-col gap-y-4 mt-6">
              {/* User card here */}
              {
                Array.from({length:5}).map((_,index)=>(
                <UserQuickFollowCard key={index} />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
