import React, { useEffect, useState } from 'react'
import { faker } from '@faker-js/faker'
import Story from './Story'

const Stories = () => {
  const [followingUsersStories, setFollowingUsersStories] = useState([])

  const createRandomUser = () => {
    return {
      userId: faker.datatype.uuid(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
      avatar: faker.image.avatar(),
    }
  }

  useEffect(() => {
    const FOLLOWING_USERS_STORIES = []
    Array.from({ length: 20 }).forEach(() => {
      FOLLOWING_USERS_STORIES.push(createRandomUser())
    })
    setFollowingUsersStories(FOLLOWING_USERS_STORIES)
  }, [])

  return (
    <div className="flex p-6 mt-8 space-x-2 overflow-x-scroll bg-white border border-gray-200 rounded-sm scrollbar-thin scrollbar-thumb-black">
      {followingUsersStories.map((profile) => (
        <Story
          key={profile.userId}
          img={profile.avatar}
          username={profile.username}
          name={profile.name}
        />
      ))}
      {/* Story */}
      {/* Story */}
      {/* Story */}
      {/* Story */}
      {/* Story */}
    </div>
  )
}

export default Stories
