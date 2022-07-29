import React from 'react'
import Post from './Post'

const posts = [
  {
    id: '123',
    username: 'stardusteight-d4c',
    userImg: 'https://avatars.githubusercontent.com/u/87643260?v=4',
    img: 'https://avatars.githubusercontent.com/u/87643260?v=4',
    caption: 'Hello people from the World!',
  },
  {
    id: '124',
    username: 'stardusteight-d4c',
    userImg: 'https://avatars.githubusercontent.com/u/87643260?v=4',
    img: 'https://avatars.githubusercontent.com/u/87643260?v=4',
    caption: 'Hello people from the World!',
  },
]

const Posts = () => {
  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.username}
          userImg={post.userImg}
          img={post.img}
          caption={post.caption}
        />
      ))}
    </div>
  )
}

export default Posts
