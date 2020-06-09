require 'test_helper'

class HallTest < ActiveSupport::TestCase

  setup do
    @user = users(:one)
    @hall = halls(:one)
    @other_hall = halls(:two)
  end

  test 'halls show their posts' do
    post = @hall.posts.create(user_id: @user.id, title: 'test', body: 'test')
    assert @hall.posts.include?(post)
    assert_equal @hall.posts.length, 1
  end

  test 'halls show their members' do
    @user.subscriptions.create(hall_id: @hall.id)
    assert @user.subscribed_halls.include?(@hall)
    assert @hall.members.include?(@user)
  end

end
