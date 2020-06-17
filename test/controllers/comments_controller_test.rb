require 'test_helper'

class CommentsControllerTest < ActionDispatch::IntegrationTest

  setup do
    @post = posts(:first)
    @other_post = posts(:second)
    @user = users(:one)
    @other_user = users(:two)
    @comment = comments(:first)
  end

  def parse_response(key)
    JSON.parse(@response.body)[key.to_s]
  end

  def log_in
    post user_token_url, params: { auth: { name: @user.name, password: 'testpassword'} }
    parse_response(:jwt)
  end

  test "creates a comment on a post" do
    assert_difference('Comment.count') do
      post comments_url, headers: { Authorization: "Bearer #{log_in}"}, params: { comment: { post_id: @post.id, user_id: @user.id, body: 'I am a test comment' } }, as: :json
    end
    assert_response 201
    assert_equal Comment.last.body, 'I am a test comment'
  end

  test "creates a reply on another comment" do
    assert_difference('Comment.count') do
      post comments_url, headers: { Authorization: "Bearer #{log_in}"}, params: { comment: { parent_id: @comment.id, post_id: @post.id, user_id: @user.id, body: 'I am a reply' } }, as: :json
    end
    assert_response 201
    assert_equal @comment.replies.first.body, 'I am a reply'
  end
end
