const topPosts = `
  type User {
    id: Int
    name: String
    posts(limit: Int): [Post]
  }

  type Post {
    id: Int
    title: String
    views: Int
    author: User
  }

  type topPosts {
    aString: String
    aBoolean: Boolean
    anInt: Int
    author(id: Int): User
    topPosts(limit: Int): [Post]
  }
`
export default topPosts
