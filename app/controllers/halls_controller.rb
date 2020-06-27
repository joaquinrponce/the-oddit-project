class HallsController < ApiController

  before_action :authenticate_user, only: [:create]
  def index
    @halls = Hall.all

    render json: @halls.to_json(methods: [:post_count, :member_count])
  end

  def show
    @hall = Hall.friendly.find(params[:id])

    render json: @hall.to_json(methods: [:post_count, :member_count], include: {members: {only: [:name]}})
  end

  def create
    @hall = Hall.new(hall_params)

    if @hall.save
      render json: @hall, status: :created, location: @hall
    else
      render json: @hall.errors, status: :unprocessable_entity
    end
  end

  def hall_params
    params.require(:hall).permit(:name, :description)
  end

end
