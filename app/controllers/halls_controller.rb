class HallsController < ApiController

  before_action :authenticate_user, only: [:create, :destroy]
  before_action :set_hall, only: [:update, :destroy]
  before_action :authorize_user, only: [:destroy]

  def index
    @halls = Hall.all

    render json: @halls.to_json(methods: [:post_count, :member_count])
  end

  def show
    @hall = Hall.friendly.find(params[:id])

    render json: @hall.to_json(methods: [:post_count, :member_count], include: {
                                                                      members: {only: [:id,:name]},
                                                                      moderationships: {
                                                                        include: {
                                                                          moderator: {only: [:id, :name]}
                                                                          },
                                                                        only: [:id]
                                                                      },
                                                                      owner: {only: [:id, :name]}
                                                                    })
  end

  def create
    @hall = Hall.new(hall_params)
    if current_user.id == @hall.owner_id
      if @hall.save
        render json: @hall, status: 200, location: @hall
      else
        render json: @hall.errors, status: :unprocessable_entity
      end
    else
      render json: {errors: {owner_id: 'must match user id'}}, status: :unauthorized
    end
  end

  def destroy
    @hall.destroy
  end

  private

  def hall_params
    params.require(:hall).permit(:name, :description, :owner_id)
  end

  def set_hall
    @hall = Hall.friendly.find(params[:id])
  end

  def authorize_user
    render json: {errors: {authorization: "User is not authorized to update or destroy requested hall."}}, status: 401 if !current_user.admin? && current_user != @hall.owner
  end

end
