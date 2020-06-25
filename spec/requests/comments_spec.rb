require 'rails_helper'

RSpec.describe "Comments", type: :request do
  def auth user
    token = Knock::AuthToken.new(payload: user.to_token_payload).token
    { 'Authorization': "Bearer #{token}"}
  end

  describe "POST /comments" do
    fixtures :users, :posts
    before(:each) do
      @post = posts(:first)
      @user = users(:one)
    end

    it "does not allow unauthorized comment requests" do
      post comments_path, params: { comment: { commentable_type: 'Post', commentable_id: @post.id, user_id: @user.id, body: 'I am a test comment' } }
      expect(response).to have_http_status(401)
    end
    it "allows authorized users to create comments" do
      post comments_path, params: { comment: { commentable_type: 'Post', commentable_id: @post.id, user_id: @user.id, body: 'I am a test comment' } }, headers: auth(@user)
      expect(response).to have_http_status(201)
    end
  end

  describe "DELETE /comments" do
    fixtures :users, :comments, :posts
    before(:each) do
      @post = posts(:first)
      @user = users(:one)
      @other_user = users(:two)
      @comment = @user.comments.create(body: 'meowzers', commentable_type: 'Post', commentable_id: @post.id)
      @other_comment = @other_user.comments.create(body: 'meowzers', commentable_type: 'Post', commentable_id: @post.id)
    end

    it "does not allow unauthorized delete requests" do
      delete comment_path(@comment)
      expect(response).to have_http_status(401)
    end

    it "does not allow non-admin user to delete other peoples comments" do
      delete comment_path(@comment), headers: auth(@other_user)
      expect(response).to have_http_status(401)
    end

    it "allows author to delete their own comments" do
      delete comment_path(@other_comment), headers: auth(@other_user)
      expect(response).to have_http_status(204)
    end

    it "allows admin to delete any comments" do
      delete comment_path(@other_comment), headers: auth(@user)
      expect(response).to have_http_status(204)
    end
  end
end
