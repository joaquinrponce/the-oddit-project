const rules = {
  0: {
    static: [
      "posts:create",
      "comments:create",
      "halls:create",
      "feed:visit",
    ],
    dynamic: {
      "posts:edit": ({userId, authorId}) => {
        if (!userId || !authorId) return false;
        return userId === authorId
      },
      "posts:destroy": ({userId, authorId}) => {
        if (!userId || !authorId) return false;
        return userId === authorId
      },
      "comments:edit": ({userId, authorId}) => {
        if (!userId || !authorId) return false;
        return userId === authorId
      },
      "comments:destroy": ({userId, authorId}) => {
        if (!userId || !authorId) return false;
        return userId === authorId
      },
    }
  },
  admin: {
    static: [
      "posts:create",
      "posts:edit",
      "posts:destroy",
      "halls:create",
      "halls:edit",
      "halls:destroy",
      "comments:create",
      "comments:edit",
      "comments:destroy",
      "feed:visit"
    ]
  }
}

export default rules;
