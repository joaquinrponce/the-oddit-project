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
    fixtures :users, :comments, :posts, :halls
    before(:each) do

      @moderated_hall = halls(:two)
      @user = users(:one)
      @other_user = users(:two)
      @normal_user = users(:three)

      @other_user.moderationships.create(hall_id: @moderated_hall.id)

      @post = posts(:first)
      @other_post = @moderated_hall.posts.create(title: 'test', body: 'test', user_id: @user.id, hall_id: @moderated_hall.id)

      @comment = @user.comments.create(body: 'meowzers', commentable_type: 'Post', commentable_id: @post.id)
      @other_comment = @other_user.comments.create(body: 'meowzers', commentable_type: 'Post', commentable_id: @post.id)
      @moderated_comment = @normal_user.comments.create(body: 'meowzers', commentable_type: 'Post', commentable_id: @other_post.id)
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

    it 'allows a moderator to delete a post in a moderated hall' do
      expect(@other_user.moderated_halls).to include(@other_post.hall)
      delete comment_path(@moderated_comment), headers: auth(@other_user)
      expect(response).to have_http_status(204)
    end
  end

  describe "PATCH /comments" do
    fixtures :users, :posts
    before(:each) do
      @user = users(:one)
      @post = posts(:first)
      @other_user = users(:two)
      @comment = @user.comments.create(body: 'meowzers', commentable_type: 'Post', commentable_id: @post.id)
      @other_comment = @other_user.comments.create(body: 'meowzers', commentable_type: 'Post', commentable_id: @post.id)
    end

    it "does not allow unauthorized patch requests" do
      patch comment_path(@comment)
      expect(response).to have_http_status(401)
    end

    it "does not allow non-admin user to edit other peoples comments" do
      patch comment_path(@comment), headers: auth(@other_user)
      expect(response).to have_http_status(401)
    end

    it "allows author to edit their own comments" do
      patch comment_path(@other_comment), headers: auth(@other_user), params: { comment: {body: 'test'}}
      expect(response).to have_http_status(200)
    end

    it "allows admin to edit any comments" do
      patch comment_path(@other_comment), headers: auth(@user), params: { comment: {body: 'test'}}
      expect(response).to have_http_status(200)
    end
  end
end
