/* eslint-disable @next/next/no-img-element */
import React from 'react'

const Story = ({ img, username, name }) => {
  return (
    <div>
      <div className="flex items-center justify-center w-[60px] h-[60px] bg-gradient-to-br  from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] rounded-full">
        <img
          className="object-contain transition duration-200 ease-out transform border-white rounded-full cursor-pointer border-[2px] w-14 h-14 hover:scale-110"
          src={img}
          alt={name}
          referrerPolicy="no-referrer"
        />
      </div>
      <p className="text-xs text-center truncate w-14">{username}</p>
    </div>
  )
}

export default Story
