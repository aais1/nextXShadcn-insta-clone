"use client"
import { LoginForm } from "@/components/login-form"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
    const session = useSession();
    const router=useRouter();
    useEffect(()=>{
        if(session?.status === "authenticated"){
            router.push("/")
        }
    },[session,router])
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
       
      <LoginForm />
    </div>
  )
}