/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Image from 'next/image'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import {
  SearchIcon,
  PlusCircleIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
  UserGroupIcon,
} from '@heroicons/react/outline'
import { HomeIcon } from '@heroicons/react/solid'

const Header = () => {
  const { data: session } = useSession()
  const router = useRouter()

  return (
    <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="flex justify-between max-w-6xl mx-5 bg-white lg:mx-auto">
        {/* Left */}
        <div onClick={() => router.push('/')} className="relative hidden w-24 cursor-pointer lg:inline-grid">
          <Image
            src="/logo.png"
            layout="fill"
            objectFit="contain"
            alt="Instagram logo"
          />
        </div>

        <div onClick={() => router.push('/')}  className="relative flex-shrink-0 w-10 cursor-pointer lg:hidden">
          <Image
            src="/simpleLogo.png"
            layout="fill"
            objectFit="contain"
            alt="Instagram logo"
          />
        </div>

        {/* Middle - Search input field */}
        <div className="relative p-3 mt-1 rounded-md">
          <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon className="w-5 h-5 text-gray-500" />
          </div>
          <input
            className="block w-full pl-10 border-gray-300 rounded-md bg-gray-50 sm:text-sm focus:ring-black focus:border-black"
            type="text"
            placeholder="Procurar"
          />
        </div>

        {/* Right */}
        <div className="flex items-center justify-end space-x-4">
          <HomeIcon onClick={() => router.push('/')}  className="navBtn" />
          <MenuIcon className="h-6 cursor-pointer md:hidden" />

          {session ? (
            <>
              <div className="relative navBtn">
                <PaperAirplaneIcon className="navBtn rotate-45 m-[-2px]" />
                <div className="absolute flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full -top-1 -right-2 animate-pulse">
                  8
                </div>
              </div>
              <PlusCircleIcon className="navBtn" />
              <UserGroupIcon className="navBtn" />
              <HeartIcon className="navBtn" />

              <img
                onClick={signOut}
                src={session.user.image}
                referrerPolicy="no-referrer"
                alt={session.user.name}
                className="h-10 rounded-full cursor-pointer"
              />
            </>
          ) : (
            <button onClick={signIn}>Entrar</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
