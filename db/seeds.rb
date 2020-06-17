# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


first = User.create(name: 'Koko', password: 'test', password_confirmation: 'test', role: 3)
second = User.create(name: 'Kokozordo', password: 'testo', password_confirmation: 'testo')
users = [first, second]

valhalla = Hall.create(name: 'Valhalla')
bifrost =  Hall.create(name: 'Bifrost')
folkvangr = Hall.create(name: 'Folkvangr')
himinbjorg = Hall.create(name: 'Himinbjorg')
bilskirnir = Hall.create(name: 'Bilskirnir')

halls = [valhalla, bifrost, folkvangr, himinbjorg, bilskirnir]

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
  user = users.sample
  halls.each do |hall|
    post = user.posts.create(title: titles.sample, body: content, hall: hall)
  end
end

2.times do
  user = users.sample
  Post.all.each do |post|
    post.comments.create(body: "Test comment!", user: user)
  end
end

allComments = Comment.all

2.times do
  user = users.sample
  allComments.each do |comment|
    comment.replies.create(body: "Test reply!", user: user)
  end
end

