class ModerationshipsController < ApiController
  
  before_action :authenticate_user
  
  def create 
    @moderationship = Moderationship.new(moderationship_params)
    if user_is_allowed
      if @moderationship.save 
        render json: @moderationship, status: :created, location: @moderationship
      else
        render json: @moderationship.errors, status: :unprocessable_entity
      end
    else
      render json: {errors: {authorization: "User is not authorized to create or destroy moderationships for requested hall"}}, status: 401
    end
  end
  
  def destroy 
    if user_is_allowed
      @moderationship.destroy
    end
  end
  
  private
  
  def moderationship_params
    params.require(:moderationship).permit(:hall_id, :moderator_id)
  end
  
  def user_is_allowed 
    current_user.admin? || current_user == Hall.find(moderationship_params[:hall_id]).owner
  end
      
end
