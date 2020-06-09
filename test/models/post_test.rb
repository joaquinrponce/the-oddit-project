require 'test_helper'

class PostTest < ActiveSupport::TestCase

  setup do
    @hall = Hall.create(name: 'Valhalla')
    @user = users(:one)
    @post = @user.posts.create(title: 'test', body: 'test body', hall: @hall)
  end

  test "correctly shows amount of upvotes " do
    assert_difference('Post.last.upvotes') do
      @post.votes.create(user: @user, value: 1)
    end
    assert_equal(1, @post.upvotes)
  end

  test "correctly shows amount of downvotes " do
    assert_difference('Post.last.downvotes') do
      @post.votes.create(user: @user, value: -1)
    end
    assert_equal(1, @post.downvotes)
  end

  test "correctly shows score " do
    @post.votes.create(user: @user, value: -1)
    @post.votes.create(user: @user, value: -1)
    @post.votes.create(user: @user, value: 1)
    @post.votes.create(user: @user, value: 1)
    @post.votes.create(user: @user, value: 1)
    @post.votes.create(user: @user, value: 1)
    assert_equal(2, @post.score)
  end



end
