require 'rails_helper'

RSpec.describe "Moderationships", type: :request do

  def auth user
    token = Knock::AuthToken.new(payload: user.to_token_payload).token
    { 'Authorization': "Bearer #{token}"}
  end

    describe "POST /moderationships" do

      fixtures :halls, :users

      before(:each) do
        @hall = halls(:one)
        @user = users(:one)
        @other_user = users(:two)
        @owned_hall = Hall.create(name: 'test', description: 'test', owner_id: @other_user.id)
        @other_user.moderationships.create(hall_id: @owned_hall.id)
        @random_user = users(:three)
      end

      it 'does not allow unauthorized post requests' do
        post moderationships_path, params: {moderationship: {hall_id: @hall.id, name: @user.name}}
        expect(response).to have_http_status(401)
      end

      it "allows an admin to create moderationships" do
        post moderationships_path, params: {moderationship: {hall_id: @hall.id, name: @user.name}}, headers: auth(@user)
        expect(response).to have_http_status(201)
      end

      it "allows the hall owner to create moderationships" do
        post moderationships_path, params: {moderationship: {hall_id: @owned_hall.id, name: @user.name}}, headers: auth(@other_user)
        expect(response).to have_http_status(201)
      end

      it "does not allow random user to create moderationships" do
        post moderationships_path, params: {moderationship: {hall_id: @hall.id, name: @user.name}}, headers: auth(@random_user)
        expect(response).to have_http_status(401)
      end

      it "returns 404 when user is not found by name" do
        post moderationships_path, params: {moderationship: {hall_id: @hall.id, name: 'youngertoguro'}}, headers: auth(@user)
        expect(response).to have_http_status(404)
      end

      it "returns a 409 when creating a duplicate moderationship" do
        post moderationships_path, params: {moderationship: {hall_id: @owned_hall.id, name: @other_user.name}}, headers: auth(@user)
        expect(response).to have_http_status(409)
      end

    end

    describe "DELETE /moderationships" do

      fixtures :halls, :users

      before(:each) do
        @hall = halls(:one)
        @user = users(:one)
        @other_user = users(:two)
        @owned_hall = Hall.create(name: 'test', description: 'test', owner_id: @other_user.id)
        @moderationship = @other_user.moderationships.create(hall_id: @owned_hall.id)
        @random_user = users(:three)
        @other_moderationship = @random_user.moderationships.create(hall_id: @owned_hall.id)
      end

      it 'does not allow unauthenticated delete requests' do
        delete moderationship_path(@moderationship)
        expect(response).to have_http_status(401)
      end

      it "returns 401 when user is not authorized to delete" do
        delete moderationship_path(@moderationship),  headers: auth(@random_user)
        expect(response).to have_http_status(401)
      end

      it "returns 204 on succesful deletion from admin" do
        delete moderationship_path(@moderationship),  headers: auth(@user)
        expect(response).to have_http_status(204)
      end

      it "returns 204 on succesful deletion from owner" do
        delete moderationship_path(@other_moderationship),  headers: auth(@other_user)
        expect(response).to have_http_status(204)
      end

    end
end
