require 'rails_helper'

RSpec.describe "Users", type: :request do

  def auth user
    token = Knock::AuthToken.new(payload: user.to_token_payload).token
    { 'Authorization': "Bearer #{token}"}
  end


  describe "GET /users" do
    it "works! (now write some real specs)" do
      get users_path
      expect(response).to have_http_status(200)
    end
  end

  describe "PATCH /user/:id" do

    fixtures :users

    before(:each) do
      @admin = users(:one)
      @normal_user = users(:two)
      @other_user = users(:three)
    end

    it "does not allow unauthorized patch requests" do
      patch user_path(@normal_user) {}
      expect(response).to have_http_status(401)
    end

    it "allows user to update its own password" do
      patch user_path(@normal_user), params: {user: {password: 'blipblop', password_confirmation: 'blipblop'}}, headers: auth(@normal_user)
      expect(response).to have_http_status(200)
    end

    it "does not allow anyone other than user to update their own password" do
      patch user_path(@normal_user), params: {user: {password: 'blipblop', password_confirmation: 'blipblop'}}, headers: auth(@admin)
      expect(response).to have_http_status(401)

      patch user_path(@normal_user), params: {user: {password: 'blipblop', password_confirmation: 'blipblop'}}, headers: auth(@other_user)
      expect(response).to have_http_status(401)
    end

    it "does not allow an invalid password update" do
      patch user_path(@normal_user), params: {user: {password: 'bg', password_confirmation: 'bg'}}, headers: auth(@normal_user)
      expect(response).to have_http_status(422)

    end

  end

end
