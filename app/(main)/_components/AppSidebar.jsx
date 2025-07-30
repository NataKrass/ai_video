'use client'
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Gem, HomeIcon, LucideFileVideo, Search, Wallet } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthContext } from '@/app/provider';

const MenuItems = [
  {
    title: 'Home',
    url: '/dashboard',
    icon: HomeIcon
  },
  {
    title: 'Create New Video',
    url: '/create-new-video',
    icon: LucideFileVideo
  },
  {
    title: 'Explore',
    url: '/explore',
    icon: Search 
  },
  {
    title: 'Billing',
    url: '/billing',
    icon: Wallet
  }
]

function AppSidebar() {
  const path = usePathname();
  const {user} = useAuthContext();

  return (
    <Sidebar>
    <SidebarHeader>
     <div>
     <div className='flex items-center gap-3 w-full justify-center'>
      <Image src={'/logo.svg'}
          alt={'logo'}
          width={30}
          height={30}
        />
        <h2  className='font-bold'>
    Video Gen
        </h2>
      </div>
      <div>
        <h2 className='text-sm text-gray-400 text-center mt-3'>AI Short Gen</h2>
      </div>
     </div>
      
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <div className='mt-10 mx-5'>
            <Button className='w-full'>+ Create New Video</Button>
          </div>
          <SidebarMenu className='mt-4'>
            {MenuItems.map((item, idx) => (
              <SidebarMenuItem key={idx} className='py-2'>
                <SidebarMenuButton className='py-5' isActive={path==item.url}>
                  <Link href={item.url} className='flex justify-start'>
                    <item.icon  className='mx-3'/>
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              )
              
            )}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarGroup></SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <div className='px-4 py-2 border rounded-lg mb-6 bg-gray-600'>
        <div className='flex justify-between items-center px-3'>
          <Gem />
          <h3>{user?.credits || '3'} Credits Left</h3>
        </div>
        <Button className='w-full mt-3'>
          Buy More Credits
        </Button>
      </div>
    </SidebarFooter>
  </Sidebar>

  )
}

export default AppSidebar