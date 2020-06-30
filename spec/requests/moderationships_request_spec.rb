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
        post moderationships_path, params: {moderationship: {hall_id: @hall.id, moderator_id: @user.id}}
        expect(response).to have_http_status(401)
      end
      
      it "allows an admin to create moderationships" do 
        post moderationships_path, params: {moderationship: {hall_id: @hall.id, moderator_id: @user.id}}, headers: auth(@user)
        expect(response).to have_http_status(201)
      end
      
      it "allows the hall owner to create moderationships" do 
        post moderationships_path, params: {moderationship: {hall_id: @owned_hall.id, moderator_id: @user.id}}, headers: auth(@other_user)
        expect(response).to have_http_status(201)
      end
      
      it "does not allow random user to create moderationships" do 
        post moderationships_path, params: {moderationship: {hall_id: @hall.id, moderator_id: @random_user.id}}, headers: auth(@random_user)
        expect(response).to have_http_status(401)
      end
    end
end
