# Instagram | Firebase, NextAuth & TailwindCSS

![banner](banner.png)

> Instagram feed clone, in this project the user can be authenticated via Google Provider using NextAuth, all routes are protected and have different functionality depending on whether the user is authenticated or not. Using Firebase's Firestore service as a Database, from which the user can insert photos, captions and delete them through Firebase service functions like `addDoc` and `deleteDoc`, if the user is not authenticated, he will not be able to perform actions within the app, but he will be able to view the posts.

:arrow_right: TailwindCSS | Rapidly build modern websites

<br />

## TailwindCSS | Rapidly build modern websites 

Tailwind CSS is a framework designed to maximize the potential of Cascading Style Sheets and take them even further. Simple, minimalist and intuitive, it offers lean code, fast customization and easy responsiveness with a Mobile First approach, work the content and form of your components without leaving JSX. 

```jsx
// components/MiniProfile.jsx 

const MiniProfile = () => {
  const { data: session } = useSession()

  return (
    <div className="flex items-center w-[290px] justify-between mt-5 ml-8">
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
```

<li type="square"><strong>An API for your design system</strong> - Utility classes help you work within the constraints of a system instead of littering your stylesheets with arbitrary values. They make it easy to be consistent with color choices, spacing, typography, shadows, and everything else that makes up a well-engineered design system.</li> <br />

<li type="square"><strong>Never ship unused CSS</strong> - Tailwind automatically removes all unused CSS when building for production, which means your final CSS bundle is the smallest it could possibly be. In fact, most Tailwind projects ship less than 10kB of CSS to the client.</li> <br />

<li type="square"><strong>Hover and focus states</strong> - Want to style something on hover? Stick hover: at the beginning of the class you want to add. Works for focus, active, disabled, focus-within, focus-visible, and even fancy states we invented ourselves like group-hover.</li> <br />

<li type="square"><strong>Dark Mode</strong> - Don’t want to be one of those websites that blinds people when they open it on their phone at 2am? Enable dark mode in your configuration file then throw dark: in front of any color utility to apply it when dark mode is active. Works for background colors, text colors, border colors, and even gradients.</li> <br />

<li type="square"><strong>Extend it, tweak it, change it</strong> - Tailwind includes an expertly crafted set of defaults out-of-the-box, but literally everything can be customized — from the color palette to the spacing scale to the box shadows to the mouse cursor. Use the `tailwind.config.js` file to craft your own design system, then let Tailwind transform it into your own custom CSS framework.</li> <br />

```js
// tailwind.config.js 

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['ui-sans-serif', 'system-ui'],
      roboto: ['Roboto'],
    },
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('tailwind-scrollbar-hide'),
  ],
}
```
*<i>tailwindcss.com</i>

<br />

NextAuth | Sessions and Content Control

With NextAuth it is possible to implement a user session (interval/period of time in which there is a communication between two or more devices) in a matter of minutes. 

### Add API route

To add NextAuth.js to a project create a file called  `[...nextauth].js` in `pages/api/auth`. This contains the dynamic route handler for NextAuth.js which will also contain all of your global NextAuth.js configurations.

```js
// pages/api/auth/[...nextauth].js

import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async session({ session, token, user }) {
      session.user.username = session.user.name
        .split(' ')
        .join('')
        .toLowerCase()

      session.user.uid = token.sub
      return session
    },
  },
})
```

### Configure Shared session state

To be able to use `useSession` first you'll need to expose the session context, `<SessionProvider />`, at the top level of your application:

```jsx
// pages/_app.jsx

import '../styles/global.css'
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  )
}
```

### Create dynamic components and control the content that can be seen with the <strong>useSession</strong> hook

The `useSession()` React Hook in the NextAuth.js client is the easiest way to check if someone is signed in:

```jsx
// components/Post.jsx

// ...
const Post = ({ id, username, userImg, img, caption }) => {
  const { data: session } = useSession()
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [likes, setLikes] = useState([])
  const [hasLiked, setHasLiked] = useState(false)
  const [showEmojis, setShowEmojis] = useState(false)

  // ...
  return (
    <div className="bg-white border rounded-lg shadow-sm my-7">
      {/* Header */}
      <div className="flex items-center p-5">
        <img
          className="object-contain w-12 h-12 p-1 mr-3 border rounded-full"
          src={userImg}
          referrerPolicy="no-referrer"
          alt="User image"
        />
        <p className="flex-1 font-bold cursor-pointer">{username}</p>
        <DotsHorizontalIcon className="h-5 cursor-pointer" />
      </div>

      {/* img */}
      <img
        src={img}
        alt="Post image"
        referrerPolicy="no-referrer"
        className="object-cover w-full"
      />

      {/* Buttons */}
      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HeartIconSolid onClick={likePost} className="text-red-500 btn" />
            ) : (
              <HeartIcon onClick={likePost} className="btn" />
            )}
            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="-mt-1 rotate-45 btn" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}

      {/* caption */}
      <p className="p-5 truncate">
        {likes.length > 0 && (
          <p className="mb-1 font-bold">{likes.length} likes</p>
        )}

        <span className="mr-1 font-bold">{username}</span>
        {caption}
      </p>

      {/* comments */}
      {comments.length > 0 && (
        <div className="h-20 ml-4 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-center mb-3 space-x-2">
              <img
                src={comment.data().userImage}
                alt=""
                className="rounded-full w-7"
              />
              <p className="flex-1 text-sm">
                <span className="font-bold">{comment.data().username}</span>{' '}
                {comment.data().comment}
              </p>
              <Moment fromNow className="pr-5 text-xs">
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {/* input box */}
      {session && (
        <form className="relative flex items-center p-4">
          <EmojiHappyIcon className="cursor-pointer w-7" onClick={() => setShowEmojis(!showEmojis)} />

          {showEmojis && (
                <div className="absolute rounded-[20px] mt-[-475px] ml-[-40px] max-w-[305px]">
                  <Picker onEmojiSelect={addEmoji} theme="light" locale="pt" />
                </div>
              )}

          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Deixe um comentário..."
            className="flex-1 ml-2 border-none outline-none focus:ring-0"
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            onClick={sendComment}
            className="font-semibold text-blue-400 disabled:cursor-not-allowed"
          >
            Post
          </button>
        </form>
      )}
    </div>
  )
}

export default Post
```






