require 'rails_helper'

RSpec.describe "Halls", type: :request do
  
  def auth user
    token = Knock::AuthToken.new(payload: user.to_token_payload).token
    { 'Authorization': "Bearer #{token}"}
  end
  
  describe "POST /halls" do

    fixtures :users

    before(:each) do
      @user = users(:one)
    end

    it "does not allow unauthorized post requests" do
      post halls_path, params: {hall: {name: 'test', description: 'a description'}}
      expect(response).to have_http_status(401)
    end
    
    it "allows authorized users to create halls and sets creator as owner" do
      post halls_path, params: {hall: {name: 'test', description: 'a description', owner_id: @user.id}}, headers: auth(@user)
      expect(response).to have_http_status(200)
      expect(Hall.last.owner.id).to eq(@user.id)
    end
  end
  
end
