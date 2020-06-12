require 'test_helper'

class PostControllerTest < ActionDispatch::IntegrationTest

  setup do
    @hall = halls(:one)
    @user = users(:one)
    @post = Post.new(hall: @hall, title: 'Test', url: 'https://www.google.com', image: 'https://www.google.com', body: 'Test Body')
  end

end
