"use client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Page({params}:{
    params:{
        profileName:string
    }
}){
    const router=useRouter();
    const session=useSession();
    useEffect(()=>{
        if(!session){
            router.push('/sign-in')
        }
    },[session,router])

    useEffect(()=>{
        const fetchData=async()=>{
            try {
                const resp=await fetch('api/profile/'+params.profileName,{
                    credentials:'include'
                });
                const data=await resp.json();
                console.log(data)
            } catch {
                console.log('err')
            }
        }   
        fetchData();
    },[])

    console.log(params.profileName)
return(
    <>
        {params.profileName}
    </>
)
}