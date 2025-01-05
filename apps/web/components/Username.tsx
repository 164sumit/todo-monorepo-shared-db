"use client"
import { useSession } from 'next-auth/react';
import React from 'react'

const Username = () => {
    const session=useSession()
  console.log(session);
  return (
    <div>
       <div className="hidden lg:block">
              {/* <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1> */}
              <p className="text-sm text-gray-500 sm:mt-0">Welcome, {session?.data?.user?.name || 'Guest'}</p>
            </div>
    </div>
  )
}

export default Username