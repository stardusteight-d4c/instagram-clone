/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import { faker } from '@faker-js/faker'

const Suggestions = () => {
  const [suggestionsToFollow, setSuggestionsToFollow] = useState([])

  const createRandomUser = () => {
    return {
      userId: faker.datatype.uuid(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
      avatar: faker.image.avatar(),
      company: faker.company.companyName(),
    }
  }

  useEffect(() => {
    const SUGGESTIONS_TO_FOLLOW = []
    Array.from({ length: 5 }).forEach(() => {
      SUGGESTIONS_TO_FOLLOW.push(createRandomUser())
    })
    setSuggestionsToFollow(SUGGESTIONS_TO_FOLLOW)
  }, [])

  return (
    <div className="mt-4 ml-10">
      <div className="flex justify-between mb-5 text-sm">
        <h3 className="text-sm font-bold text-gray-400">Sugestões para você</h3>
        <button className="font-semibold text-gray-500">Ver todas</button>
      </div>

      {suggestionsToFollow.map((profile) => (
        <div
          key={profile.id}
          className="flex items-center justify-between mt-3"
        >
          <img
            className="w-10 h-10 rounded-full border p-[2px]"
            src={profile.avatar}
            alt={profile.name}
          />

          <div className="flex-1 ml-4">
            <h2 className="text-sm font-semibold">{profile.username}</h2>
            <h3 className="text-xs text-gray-400 w-[170px] truncate">
              Trabralha na {profile.company}
            </h3>
          </div>

          <button className="text-sm font-semibold text-blue-400">Seguir</button>
        </div>
      ))}
    </div>
  )
}

export default Suggestions
