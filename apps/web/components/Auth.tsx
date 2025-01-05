"use client"
import { useState } from "react";
// import { LoginForm } from "@/components/auth/LoginForm";
// import { SignupForm } from "@/components/auth/SignupForm";
import { LockKeyhole } from "lucide-react";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="rounded-full bg-primary/10 p-3">
            <LockKeyhole className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isLogin ? "Welcome back" : "Create your account"}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="font-medium text-primary hover:text-primary/90 transition-colors"
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm rounded-lg sm:px-10">
          {isLogin ? <LoginForm /> : <SignupForm setIsLogin={setIsLogin} />}
        </div>
      </div>
    </div>
  );
}