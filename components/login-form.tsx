"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Github } from "lucide-react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    })

    if (res?.error) {
      // Show error toast
      console.log(res)
      toast({
        title: "Error",
        description: res.error || "Something went wrong. Please try again.",
        variant: "destructive", // You can change the variant for error styling
      })
    } else {
      toast({
        title: "Success",
        description: "You have logged in successfully.",
        variant: "success", // For success message
      })
      router.push('/') // Redirect on successful login
    }

    setLoading(false)
  }

  return (
    <Card className="mx-auto w-full md:w-[50%] lg:w-[35%]">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <div className="flex items-center justify-center"><Loader2 className="animate-spin mr-2" size={18} />Logging in...</div> : "Login"}
            </Button>
          </div>
        </form>

        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{""}
          <Link href="/sign-up" className="underline">
            Sign up
          </Link>
        </div>

        <div className="mt-4 text-center">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              signIn("github")
            }}
          >
            Login with Github <Github />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
