/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import { SUGGESTIONS_TO_FOLLOW } from '../mockData'
// import { faker } from '@faker-js/faker'

const Suggestions = () => {
  const [suggestionsToFollow, setSuggestionsToFollow] = useState(SUGGESTIONS_TO_FOLLOW)

  // const createRandomUser = () => {
  //   return {
  //     userId: faker.datatype.uuid(),
  //     name: faker.name.findName(),
  //     username: faker.internet.userName(),
  //     avatar: faker.image.avatar(),
  //     company: faker.company.companyName(),
  //   }
  // }

  // useEffect(() => {
  //   const SUGGESTIONS_TO_FOLLOW = []
  //   Array.from({ length: 5 }).forEach(() => {
  //     SUGGESTIONS_TO_FOLLOW.push(createRandomUser())
  //   })
  //   console.log('SUGGESTIONS_TO_FOLLOW', SUGGESTIONS_TO_FOLLOW)
  //   setSuggestionsToFollow(SUGGESTIONS_TO_FOLLOW)
  // }, [])

  return (
    <div className="mt-4 ml-8">
      <div className="flex justify-between mb-5 text-sm">
        <h3 className="text-sm font-bold text-gray-400">Sugestões para você</h3>
        <button className="font-semibold text-gray-500">Ver todas</button>
      </div>

      {suggestionsToFollow.map((profile, index) => (
        <div
          key={index}
          className="flex items-center justify-between mt-3"
        >
          <img
            className="w-10 h-10 rounded-full border p-[2px]"
            src={profile.avatar}
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
