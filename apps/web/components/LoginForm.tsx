"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
// import { signIn } from "@/auth";

export function LoginForm() {
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router=useRouter();
  console.log(session);
  


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })
      
      if (!res?.error) {
        // Handle successful login
        alert("Login successful")
        router.push('/') // or wherever you want to redirect
      } else {
        // Handle error
        alert("Invalid email or password") // display error message
        // console.log(res.error) // log error to console for debugging
        console.log("error", res.error)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="email">Email address</Label>
        <div className="mt-1">
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <div className="mt-1">
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full"
            placeholder="••••••••"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <a href="#" className="font-medium text-primary hover:text-primary/90">
            Forgot your password?
          </a>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full flex justify-center py-2"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing in...
          </>
        ) : (
          "Sign in"
        )}
      </Button>
    </form>
  );
}