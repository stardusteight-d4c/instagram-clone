/* eslint-disable @next/next/no-img-element */
import React from 'react'

const MiniProfile = () => {
  return (
    <div className="flex items-center justify-between ml-10 mt-14">
      <img
        className="w-16 h-16 rounded-full border p-[2px]"
        src="https://avatars.githubusercontent.com/u/87643260?v=4"
        alt="User image"
      />

      <div className="flex-1 mx-4">
        <h2 className="font-bold">stardusteight-d4c</h2>
        <h3 className="text-sm text-gray-400">Bem vindo ao instragram</h3>
      </div>

      <button className="text-sm font-semibold text-blue-400">Sair</button>
    </div>
  )
}

export default MiniProfile
