import React from 'react'
import { useSession } from 'next-auth/react'

import MiniProfile from './MiniProfile'
import Posts from './Posts'
import Stories from './Stories'
import Suggestions from './Suggestions'

const Feed = () => {
  const { data: session } = useSession()

  return (
    <main className={`grid grid-cols-1 mx-auto md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-3xl ${!session && "!grid-cols-1 !max-w-xl"}`}>
      <section className={`col-span-1 md:col-span-2 ${!session && "md:col-span-1"}`}>
        <Stories />
        <Posts />
      </section>

      {session && (
        <section className="hidden xl:inline-grid md:col-span-1">
          <div className="sticky h-[80vh] top-20">
            <MiniProfile />
            <Suggestions />
          </div>
        </section>
      )}
    </main>
  )
}

export default Feed
