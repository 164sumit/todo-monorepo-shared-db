import TaskComponent from '@/components/Temp'
import Link from 'next/link'
import React from 'react'
import AllTasks from '../components/AllTasks'
import CreateTodo from '../components/CreateTodo'
import { LayoutDashboard } from 'lucide-react'
import LogoutButton from '@/components/LogoutButton'
import { useSession } from 'next-auth/react'
import Username from '@/components/Username'
import { auth } from '@/auth'

const page = async() => {
      const session = await auth()
  
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <LayoutDashboard className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
                <p className="text-sm text-gray-500">Organize your tasks efficiently</p>
              </div>

            </div>
            <div>
            <div className="hidden lg:block">
              {/* <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1> */}
              <p className="text-sm text-gray-500 sm:mt-0">Welcome, {session?.user?.name || 'Guest'}</p>
            </div>

            {/* <Username /> */}
            </div>
           <LogoutButton/>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="sticky top-8">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <CreateTodo />
              </div>
            </div>
          </div>

          {/* Main Task List */}
          <div className="mt-8 lg:mt-0 lg:col-span-8 xl:col-span-9">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <AllTasks />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500">
            Task Manager Dashboard - Organize your work efficiently
          </p>
        </div>
      </footer>
    </div>
  )
}

export default page