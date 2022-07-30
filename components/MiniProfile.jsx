/* eslint-disable @next/next/no-img-element */
import { signOut, useSession } from 'next-auth/react'
import React from 'react'

const MiniProfile = () => {
  const { data: session } = useSession()

  return (
    <div className="flex items-center justify-between mt-5 ml-8">
      <img
        className="w-16 h-16 rounded-full border p-[2px]"
        referrerPolicy="no-referrer"
        src={session?.user.image}
        alt="User image"
      />

      <div className="flex-1 mx-4">
        <h2 className="font-bold cursor-pointer">{session?.user.username}</h2>
        <h3 className="text-sm text-gray-400">Bem vindo ao instagram</h3>
      </div>

      <button onClick={signOut} className="text-sm font-semibold text-blue-400">
        Sair
      </button>
    </div>
  )
}

export default MiniProfile
