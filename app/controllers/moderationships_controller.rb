class ModerationshipsController < ApiController

  before_action :authenticate_user
  before_action :set_moderationship, only: [:destroy]
  before_action :set_hall
  before_action :authorize_user
  before_action :find_target, only: [:create]
  before_action :find_existing_moderationship, only: [:create]

  def create
    render json: {error: {moderator: 'Target user was not found.'}}, status: 404 and return if !@target
    render json: {error: {moderator: 'Target user is already moderator of requested hall.'}}, status: 409 and return if @target && @moderationship.present?
    @moderationship = Moderationship.new(hall_id: moderationship_params[:hall_id], moderator_id: @target.id)
    if @moderationship.save
      render json: @moderationship, status: :created, location: @moderationship
    else
      render json: @moderationship.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @moderationship.destroy
  end

  private

  def moderationship_params
    params.require(:moderationship).permit(:hall_id, :name)
  end

  def find_target
    @target = User.find_by(name: params[:moderationship][:name]) if params[:moderationship][:name].present?
  end

  def find_existing_moderationship
    @moderationship = Moderationship.find_by(hall_id: @hall.id, moderator_id: @target.id) if @target.present?
  end

  def set_moderationship
    @moderationship = Moderationship.find(params[:id])
  end

  def set_hall
    @hall = @moderationship.present? ? @moderationship.hall : Hall.find(params[:moderationship][:hall_id])
  end

  def authorize_user
    render json: {errors: {authorization: "User is not authorized to create or destroy moderationships for requested hall"}}, status: 401 if !current_user.admin? && current_user != @hall.owner
  end

end
