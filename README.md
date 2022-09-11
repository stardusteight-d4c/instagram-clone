# Instagram | Firebase, NextAuth & TailwindCSS

![banner](banner.png)

> Instagram feed clone, in this project the user can be authenticated via Google Provider using NextAuth, all routes are protected and have different functionality depending on whether the user is authenticated or not. Using Firebase's Firestore service as a Database, from which the user can insert photos, captions and delete them through Firebase service functions like `addDoc` and `deleteDoc`, if the user is not authenticated, he will not be able to perform actions within the app, but he will be able to view the posts.

:arrow_right: TailwindCSS | Rapidly build modern websites <br />
:arrow_right: NextAuth | Sessions and Content Control <br />
:arrow_right: Firebase Integration - Persisting Data <br />

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

<li><strong>An API for your design system</strong> - Utility classes help you work within the constraints of a system instead of littering your stylesheets with arbitrary values. They make it easy to be consistent with color choices, spacing, typography, shadows, and everything else that makes up a well-engineered design system.</li> <br />

<li><strong>Never ship unused CSS</strong> - Tailwind automatically removes all unused CSS when building for production, which means your final CSS bundle is the smallest it could possibly be. In fact, most Tailwind projects ship less than 10kB of CSS to the client.</li> <br />

<li><strong>Hover and focus states</strong> - Want to style something on hover? Stick hover: at the beginning of the class you want to add. Works for focus, active, disabled, focus-within, focus-visible, and even fancy states we invented ourselves like group-hover.</li> <br />

<li><strong>Dark Mode</strong> - Don’t want to be one of those websites that blinds people when they open it on their phone at 2am? Enable dark mode in your configuration file then throw dark: in front of any color utility to apply it when dark mode is active. Works for background colors, text colors, border colors, and even gradients.</li> <br />

<li><strong>Extend it, tweak it, change it</strong> - Tailwind includes an expertly crafted set of defaults out-of-the-box, but literally everything can be customized — from the color palette to the spacing scale to the box shadows to the mouse cursor. Use the `tailwind.config.js` file to craft your own design system, then let Tailwind transform it into your own custom CSS framework.</li> <br />

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

## NextAuth | Sessions and Content Control

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

*<i>next-auth.js.org/getting-started/client</i>

<br />

## Firebase Integration - Persisting Data

Using the services provided by Firebase, we can create functional applications in a matter of minutes, whose data is stored and retrieved through its functions such as `addDoc()`, `updateDoc()` or `onSnapshot()` provided when using Firestore . After setting up the Firebase environment, installing it and creating the client, let's see how we can use these functions provided by the different Firebase services.

### Cloud Firestore

Use Firebase's flexible and scalable NoSQL cloud database to store and sync data for both server-side and client-side development.

Cloud Firestore is a flexible and scalable database for mobile, web and server focused development by Firebase and Google Cloud. Like Firebase Realtime Database, it keeps your data in sync across client applications using real-time listeners. Plus, it offers offline support for mobile and web devices so you can build responsive apps that work regardless of network latency or internet connectivity. Cloud Firestore also offers seamless integration with other Firebase and Google Cloud products, including Cloud Functions.

<li><strong>Initialize Cloud Firestore</strong> - Initialize a Cloud Firestore instance:</li> <br />

```js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    // ...
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
```
<br />
<li><strong>Add Data</strong> - Cloud Firestore stores data in Documents that are stored in Collections. Cloud Firestore implicitly creates collections and documents the first time you add data to the document. It is not necessary to create collections or documents explicitly. Create a new collection and document using the following sample code.</li> <br />

```jsx
// components/Modal.jsx

import { db, storage } from '../firebase'
import {
  addDoc,
  collection,
  serverTimestamp,
} from 'firebase/firestore'

// Create a post and add to Firestore 'posts' collection
  const docRef = await addDoc(collection(db, 'posts'), {
      username: session.user.username,
      caption: captionRef.current.value,
      profileImg: session.user.image,
      timestamp: serverTimestamp(),
    })

// Get the post ID for the newly created post
console.log('New doc added with ID', docRef.id)
```
<br />
<li><strong>Read Data</strong> - To quickly verify that you've added data to Cloud Firestore, use the data viewer in the Firebase console. You can use the <strong>query</strong> method to query your collection.</li> <br />

```jsx
// components/Posts.jsx

import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'

useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
        (snapshot) => {
          setPosts(snapshot.docs)
        }
      ),
    []
  )
```

*<i>firebase.google.com/docs/firestore/quickstart?authuser=0&hl=en</i>
<br />

### Cloud Storage for Firebase

Cloud Storage for Firebase is designed for app developers to store and display user-generated content such as photos or videos.

Cloud Storage for Firebase is a powerful, simple, and cost-effective object storage service built for Google scale. With the Firebase SDKs for Cloud Storage, you can use Google security to upload and download files in Firebase apps, regardless of network quality.

<li><strong>Upload files</strong> - To upload a file to Cloud Storage, first reference the full path of the file, including the file name.</li> <br />

```jsx
// components/Modal.jsx

import { storage } from '../firebase'
import { ref } from 'firebase/storage'

//  Upload the image to firebase storage with the post ID
const imageRef = ref(storage, `posts/${docRef.id}/image`)
```

<li><strong>Upload a string</strong> - If a Blob, File, or Uint8Array is not available, you can use <strong>uploadString()</strong> to upload a raw base64 encoded string, base64url, or data_url to Cloud Storage:</li> <br />

```js
uploadString(ref: StorageReference, value: string, format?: StringFormat | undefined, metadata?: UploadMetadata | undefined): Promise<UploadResult>
```

<li><strong>Convert the image to base64</strong></li> <br />

```jsx
// components/Modal.jsx

const addImageToPost = (e) => {
  const reader = new FileReader()
  if (e.target.files[0]) {
    reader.readAsDataURL(e.target.files[0])
  }

  reader.onload = (readerEvent) => {
    setSelectedFile(readerEvent.target.result)
  }
}
```

#### <i>FileReader</i>

The FileReader object allows web applications to <strong>asynchronously read the contents of files</strong> (or raw data buffers) from the user's computer, using the File or Blob object to specify the file or data to be read.

#### <i>FileReader.readAsDataURL()</i>

The `readAsDataURL` method is used to read content of type Blob or File. When the read operation ends, the readyState flag changes to DONE and the loadend event is fired. Then the `result` attribute will contain the base64 encoded URL of the file.

#### <i>FileReader.onload</i>

A handler for the load event. This event is called each time the read operation is successfully completed.
<br />
<li><strong>uploadString() &  getDownloadURL()</strong> - Use the base64 encoded url of the file with the uploadString() function and update the post document containing the url of the image in Storage Cloud:</li> <br />

```jsx
// components/Modal.jsx

// Get a download URL from db storage and update to original post with image
await uploadString(imageRef, selectedFile, 'data_url').then(
  async (snapshot) => {
    const donwloadURL = await getDownloadURL(imageRef)
    await updateDoc(doc(db, 'posts', docRef.id), {
      image: donwloadURL,
    })
   }
)
```

*<i>firebase.google.com/docs/storage/web/upload-files</i> <br />
*<i>developer.mozilla.org/en-US/docs/Web/API/FileReader</i>





