"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { addUser } from "@/app/actions/actions";
import { useRouter } from "next/navigation";

export function SignupForm({ setIsLogin }: { setIsLogin: (isLogin: boolean) => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router=useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data=await addUser({name,email,password});
      console.log(data);
      alert("user created successfully");
      setEmail("");
      setPassword("");
      setName("");
      setIsLogin(true);
      router.refresh()
      setIsLoading(false)

      
    } catch (error) {
      alert(error);
      setIsLoading(false);
    }

    // Add your signup logic here
    // setTimeout(() => setIsLoading(false), 1000);

  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="name">Full name</Label>
        <div className="mt-1">
          <Input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full"
            placeholder="John Doe"
          />
        </div>
      </div>

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

      <div className="flex items-center">
        <input
          id="terms"
          name="terms"
          type="checkbox"
          required
          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
        />
        <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
          I agree to the{" "}
          <a href="#" className="text-primary hover:text-primary/90">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-primary hover:text-primary/90">
            Privacy Policy
          </a>
        </label>
      </div>

      <Button
        type="submit"
        className="w-full flex justify-center py-2"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating account...
          </>
        ) : (
          "Create account"
        )}
      </Button>
    </form>
  );
}