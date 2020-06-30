require 'rails_helper'

RSpec.describe "Posts", type: :request do
  def auth user
    token = Knock::AuthToken.new(payload: user.to_token_payload).token
    { 'Authorization': "Bearer #{token}"}
  end

  describe "GET /posts" do
    it "works! (now write some real specs)" do
      get posts_path
      expect(response).to have_http_status(200)
    end
  end
  
  describe "POST /posts" do

    fixtures :users, :posts, :halls

    before(:each) do
      @user = users(:one)
      @hall = halls(:one)
    end

    it "does not allow unauthorized post requests" do
      post posts_path, params: {title: 'test', body: 'test', hall_id: @hall.id, user_id: @user.id}
      expect(response).to have_http_status(401)
    end
    
    it "allows authorized users to create posts" do
      post posts_path, params: {title: 'test', body: 'test', hall_id: @hall.id, user_id: @user.id}, headers: auth(@user)
      expect(response).to have_http_status(201)
    end
  end

  describe "DELETE /posts" do
    fixtures :users, :halls
    before(:each) do
      @hall = halls(:one)
      @moderated_hall = halls(:two)
      
      @user = users(:one)
      @other_user = users(:two)
      @normal_user = users(:three)
      
      @post = @user.posts.create(title:'test', body: 'test', hall: @hall)
      @other_post = @other_user.posts.create(title: 'test', body: 'test', hall: @hall)
      @moderated_post = @normal_user.posts.create(title: 'test', body: 'test', hall: @moderated_hall)
    end

    it "does not allow unauthorized delete requests" do
      delete post_path(@post)
      expect(response).to have_http_status(401)
    end

    it "does not allow non-admin user to delete other peoples posts" do
      delete post_path(@post), headers: auth(@other_user)
      expect(response).to have_http_status(401)
    end

    it "allows author to delete their own posts" do
      delete post_path(@other_post), headers: auth(@other_user)
      expect(response).to have_http_status(204)
    end

    it "allows admin to delete any posts" do
      delete post_path(@other_post), headers: auth(@user)
      expect(response).to have_http_status(204)
    end
    
    it 'allows a moderator to delete a post in a moderated hall' do 
      @other_user.moderationships.create(hall_id: @moderated_hall.id)
      delete post_path(@moderated_post), headers: auth(@other_user)
      expect(response).to have_http_status(204)
    end
  end

  describe "PATCH /posts" do
    fixtures :users, :halls
    before(:each) do
      @hall = halls(:one)
      @user = users(:one)
      @other_user = users(:two)
      @post = @user.posts.create(title:'test', body: 'test', hall: @hall)
      @other_post = @other_user.posts.create(title: 'test', body: 'test', hall: @hall)
    end

    it "does not allow unauthorized patch requests" do
      patch post_path(@post)
      expect(response).to have_http_status(401)
    end

    it "does not allow non-admin user to patch other peoples posts" do
      patch post_path(@post), headers: auth(@other_user), params: { title: 'update-test', body: 'body-test'}
      expect(response).to have_http_status(401)
    end

    it "allows author to patch their own posts" do
      patch post_path(@other_post), headers: auth(@other_user), params: { title: 'update-test', body: 'body-test'}
      expect(response).to have_http_status(200)
    end

    it "allows admin to patch any posts" do
      patch post_path(@other_post), headers: auth(@user), params: { title: 'update-test', body: 'body-test'}
      expect(response).to have_http_status(200)
    end
  end
end
