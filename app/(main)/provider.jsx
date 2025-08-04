'use client'
import { useAuthContext } from '../provider'
import { SidebarProvider } from '@/components/ui/sidebar'
import React, { useEffect } from 'react'
import AppSidebar from './_components/AppSidebar'
import AppHeader from './_components/AppHeader'
import { useRouter } from 'next/navigation'

function DashboardProvider({children}) {

  const {user} = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    user && checkUserAuthenticated()
  }, [user])

  const checkUserAuthenticated = () => {
   if(!user) {
    router.replace('/');
   }
  }
  
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className='w-full'>
        <AppHeader />
        <div className='p-10'>
          {children}
        </div>
      </div>
    </SidebarProvider>
    
  )
}

export default DashboardProvider