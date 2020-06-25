require 'test_helper'

class PostControllerTest < ActionDispatch::IntegrationTest

  setup do
    @hall = halls(:one)
    @user = users(:one)
    @other_user = users(:two)
    @post = posts(:first)
    @other_post = posts(:second)
  end

  def parse_response(key)
    JSON.parse(@response.body)[key.to_s]
  end

  def log_in
    post user_token_url, params: { auth: { name: @user.name, password: 'testpassword'} }
    parse_response(:jwt)
  end

  test 'doest not allow creating a post if not authorized' do
    assert_no_difference('Post.count') do
      post posts_url, params: { title: 'Yes', user_id: @user.id, hall_id: @hall.id, body: 'Test' }, as: :json
    end
    assert_response 401
  end

  test 'allows creating a post if authorized' do
    assert_difference('Post.count') do
      post posts_url, headers: { "accept": "application/json", Authorization: "Bearer #{log_in}"}, params: { title: 'Yes', user_id: @user.id, hall_id: @hall.id, body: 'Test' }, as: :json
    end
    assert_response 201
  end

  test "deletes as post as admin" do
    assert_difference('Post.count', -1) do
      delete post_url @post, headers: { "accept": "application/json", Authorization: "Bearer #{log_in}"}, as: :json
    end
    assert_response 204
  end

  test "deletes a post as author" do
    assert_difference('Post.count', -1) do
      delete post_url @other_post, headers: { "accept": "application/json", Authorization: "Bearer #{log_in}"}, as: :json
    end
    assert_response 204
  end

  test "does not allow delete without auth" do
    assert_no_difference('Post.count') do
      delete post_url @post, as: :json
    end
    assert_response 401
  end

  test "does not allow delete if not user author or admin" do
    assert_no_difference('Post.count') do
      delete post_url @post, headers: { Authorization: "Bearer #{log_in}"}, as: :json
    end
    assert_response 401
  end

end
