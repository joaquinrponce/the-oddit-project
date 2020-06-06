require 'test_helper'

class PostControllerTest < ActionDispatch::IntegrationTest

  setup do
    @user = users(:one)
    @post = Post.new(title: 'Test', url: 'https://www.google.com', image: 'https://www.google.com', body: 'Test Body')
  end

  test 'creates a text post and sets its url to itself' do
    assert_difference('Post.count') do
      post posts_url, params: {post: {user_id: @user.id, title: @post.title, body: @post.body}}
    end
    assert_response 201
    new_post = Post.last
    assert_equal("https://www.example.com/api/posts/#{new_post.id}", new_post.url)
  end

end
