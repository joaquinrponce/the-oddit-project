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
      "posts:destroy": ({userId, authorId, hallId, moderatedHalls = []}) => {
        if (!userId || !authorId || !hallId) return false
        if (userId === authorId) return true
        if (moderatedHalls.includes(hallId)) return true
        return false
      },
      "comments:edit": ({userId, authorId}) => {
        if (!userId || !authorId) return false;
        return userId === authorId
      },
      "comments:destroy": ({userId, authorId, hallId, moderatedHalls = []}) => {
        console.log(userId, authorId, hallId, moderatedHalls)
        if (!userId || !authorId || !hallId) return false
        if (userId === authorId) return true
        if (moderatedHalls.includes(hallId)) return true
        return false
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
