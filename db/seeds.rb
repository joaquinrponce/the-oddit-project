# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


first = User.create(name: 'koko', password: 'test', password_confirmation: 'test', role: 'admin')

theodinproject =  Hall.create(name: 'theodinproject', description:
  'A hall dedicated to **TheOdinProject**, an open source online curriculum for learning web development. Find it at: https://theodinproject.com', owner_id: first.id)
music = Hall.create(name: 'music', description: 'A hall for all things **music** related: **songs, artists, media,** and more.', owner_id: first.id)
gaming = Hall.create(name: 'gaming', description: 'Gaming news, developer betrayals, **steam sales**, victory screenshots, and more!', owner_id: first.id)
technology = Hall.create(name: 'technology', description: '**News** and **info** on modern technologies.', owner_id: first.id)

if !Rails.env.production?
  second = User.create(name: 'kokozordo', password: 'testo', password_confirmation: 'testo')
  users = [first, second]

  halls = [theodinproject, music, gaming, technology]

  content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
          laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
          voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
          non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

          titles = [
    'William Shakespeare', 'Emily Dickinson', 'Edgar Allan Poe', 'Walt Whitman',
    'E. E. Cummings', 'William Wordsworth', 'Henry Wadsworth Longfellow',
    'T. S. Eliot', 'Emily Bronte', 'Oscar Wilde', 'Rudyard Kipling',
    'Charlotte Bronte', 'Geoffrey Chaucer', 'Charles Baudelaire',
    'Ralph Waldo Emerson'
  ]


  2.times do
    users.each do |user|
      halls.each do |hall|
        post = user.posts.create(title: titles.sample, body: content, hall: hall)
      end
    end
  end

  users.each do |user|
    Post.all.each do |post|
      post.replies.create(body: "Test comment!", user: user)
    end
  end

  users.each do |user|
    Comment.all.each do |comment|
        comment.replies.create(body: "Test reply!", user: user)
    end
  end
end
