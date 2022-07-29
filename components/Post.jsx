/* eslint-disable @next/next/no-img-element */
import React from 'react'
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid'

const Post = ({ id, username, userImg, img, caption }) => {
  return (
    <div className="bg-white border rounded-sm my-7">
      {/* Header */}
      <div className="flex items-center p-5">
        <img
          className="object-contain w-12 h-12 p-1 mr-3 border rounded-full"
          src={userImg}
          referrerPolicy="no-referrer"
          alt="User image"
        />
        <p className="flex-1 font-bold">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>

      {/* img */}
      <img
        src={img}
        alt="Post image"
        referrerPolicy="no-referrer"
        className="object-cover w-full"
      />

      {/* Buttons */}
      <div className="flex justify-between px-4 pt-4">
        <div className="flex space-x-4">
          <HeartIcon className="btn" />
          <ChatIcon className="btn" />
          <PaperAirplaneIcon className="-mt-1 rotate-45 btn" />
        </div>
        <BookmarkIcon className="btn" />
      </div>

      {/* caption */}
      <p className="p-5 truncate">
        <span className="mr-1 font-bold">{username}</span>
        {caption}
      </p>

      {/* comments */}

      {/* input box */}
      <form className="flex items-center p-4">
        <EmojiHappyIcon className="w-7" />
        <input
          type="text"
          placeholder="Deixe um comentário..."
          className="flex-1 border-none outline-none focus:ring-0"
        />
        <button className="font-semibold text-blue-400">Post</button>
      </form>
    </div>
  )
}

export default Post
