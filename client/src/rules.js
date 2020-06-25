const rules = {
  user: {
    static: [
      "posts:create",
      "halls:create"
      "feed:visit",
    ],
    dynamic: [
      "posts:edit": ({userId, authorId}) => {
        if (!userId || !authorId) return false;
        return userId === authorId
      }
    ]
  }
}
