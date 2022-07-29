/* eslint-disable @next/next/no-img-element */
import React from 'react'

const Story = ({ img, username, name }) => {
  return (
    <div>
      <img
        className="w-14 h-14 rounded-full p-[1.5px] border-red-500 border-2 object-contain cursor-pointer transition transform duration-200 ease-out hover:scale-110"
        src={img}
        alt={name}
        referrerPolicy="no-referrer"
      />
      <p className="text-xs text-center truncate w-14">{username}</p>
    </div>
  )
}

export default Story
