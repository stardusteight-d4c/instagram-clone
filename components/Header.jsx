/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import React from 'react'
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
  return (
    <div>
      <div className="flex justify-between bg-white max-w-6xl mx-5 lg:mx-auto">
        {/* Left */}
        <div className="relative hidden lg:inline-grid w-24">
          <Image
            src="/logo.png"
            layout="fill"
            objectFit="contain"
            alt="Instagram logo"
          />
        </div>

        <div className="relative w-10 lg:hidden flex-shrink-0 cursor-pointer">
          <Image
            src="/simpleLogo.png"
            layout="fill"
            objectFit="contain"
            alt="Instagram logo"
          />
        </div>

        {/* Middle - Search input field */}
        <div className="relative mt-1 p-3 rounded-md">
          <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="w-5 h-5 text-gray-500" />
          </div>
          <input
            className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md"
            type="text"
            placeholder="Procurar"
          />
        </div>

        {/* Right */}
        <div className="flex items-center justify-end space-x-4">
          <HomeIcon className="navBtn" />
          <MenuIcon className="h-6 md:hidden cursor-pointer" />
          <div className="relative navBtn">
            <PaperAirplaneIcon className="navBtn rotate-45 m-[-2px]" />
            <div className="absolute -top-1 -right-2 text-xs w-4 h-4 bg-red-500 rounded-full flex items-center justify-center animate-pulse text-white">
              8
            </div>
          </div>
          <PlusCircleIcon className="navBtn" />
          <UserGroupIcon className="navBtn" />
          <HeartIcon className="navBtn" />

          <img
            src="https://avatars.githubusercontent.com/u/87643260?v=4"
            alt="Profile pic"
            className="h-10 rounded-full cursor-pointer"
          />
        </div>
      </div>
    </div>
  )
}

export default Header
