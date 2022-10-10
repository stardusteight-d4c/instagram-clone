import React, { useEffect, useState } from 'react'
// import { faker } from '@faker-js/faker'
import Story from './Story'
import { useSession } from 'next-auth/react'
import {FOLLOWING_USERS_STORIES } from '../mockData'

const Stories = () => {
  const [followingUsersStories, setFollowingUsersStories] = useState(FOLLOWING_USERS_STORIES)
  const { data: session } = useSession()

  // const createRandomUser = () => {
  //   return {
  //     userId: faker.datatype.uuid(),
  //     username: faker.internet.userName(),
  //     avatar: faker.image.avatar(),
  //   }
  // }

  // useEffect(() => {
  //   const FOLLOWING_USERS_STORIES = []
  //   Array.from({ length: 10 }).forEach(() => {
  //     FOLLOWING_USERS_STORIES.push(createRandomUser())
  //   })
  //   console.log('FOLLOWING_USERS_STORIES', FOLLOWING_USERS_STORIES);
  //   setFollowingUsersStories(FOLLOWING_USERS_STORIES)
  // }, [])

  return (
    <div className="flex p-6 mt-8 space-x-2 overflow-x-scroll bg-white border border-gray-200 rounded-lg shadow-sm scrollbar-thin scrollbar-thumb-black">
      {session && (
        <Story
          img={session.user.image}
          username={session.user.username}
          name={session.user.name}
        />
      )}
      {followingUsersStories.map((profile) => (
        <Story
          key={profile.userId}
          img={profile.avatar}
          username={profile.username}
        />
      ))}
    </div>
  )
}

export default Stories
