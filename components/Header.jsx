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
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtom'

const Header = () => {
  const { data: session } = useSession()
  const [open, setOpen] = useRecoilState(modalState)
  const router = useRouter()

  return (
    <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="flex justify-between max-w-4xl mx-5 bg-white lg:mx-auto">
        {/* Left */}
        <div
          onClick={() => router.push('/')}
          className="relative hidden cursor-pointer w-28 lg:inline-grid"
        >
          <Image
            src="/logo.png"
            layout="fill"
            objectFit="contain"
            alt="Instagram logo"
          />
        </div>

        <div
          onClick={() => router.push('/')}
          className="relative flex-shrink-0 w-10 cursor-pointer lg:hidden"
        >
          <Image
            src="/simpleLogo.png"
            layout="fill"
            objectFit="contain"
            alt="Instagram logo"
          />
        </div>

        {/* Middle - Search input field */}
        <div className="relative p-3 mt-1 rounded-md ml-[65px]">
          <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon className="w-5 h-5 text-gray-500" />
          </div>
          <input
            className="block w-[120%] pl-10 outline-none py-2 rounded-md bg-[#efefef] sm:text-sm"
            type="text"
            placeholder="Procurar"
          />
        </div>

        {/* Right */}
        <div className="flex items-center justify-end space-x-4 mr-[-20px]">
          <HomeIcon onClick={() => router.push('/')} className="navBtn" />
          <MenuIcon className="h-6 cursor-pointer md:hidden" />

          {session ? (
            <>
              <div className="relative navBtn">
                <PaperAirplaneIcon className="navBtn rotate-45 m-[-2px]" />
                <div className="absolute flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full -top-1 -right-2 animate-pulse">
                  8
                </div>
              </div>
              <PlusCircleIcon
                onClick={() => setOpen(true)}
                className="navBtn"
              />
              <UserGroupIcon className="navBtn" />
              <HeartIcon className="navBtn" />

              <img
                onClick={signOut}
                src={session.user.image}
                referrerPolicy="no-referrer"
                alt={session.user.name}
                className="w-8 rounded-full cursor-pointer"
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
