"use client"
import React from 'react'
import { Button } from './ui/button'
// import { signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'
// import { signOut } from '@/auth'

import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const LogoutButton = () => {
    const router = useRouter();
    const { data: session } = useSession();
    
    const handleLogout = () => {
        signOut();
        router.push("/auth")
      };
  return (
    <div>
        
        
         <Button
    onClick={handleLogout}
    variant="outline"
    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
  >
    <LogOut className="h-4 w-4" />
    <span>Logout</span>
  </Button>
  
  </div>
  )
}

export default LogoutButton