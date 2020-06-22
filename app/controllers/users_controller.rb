class UsersController < ApiController
  before_action :set_user, only: [:show, :update, :destroy]
  skip_before_action :verify_authenticity_token, raise: false

  # GET /users
  def index
    @users = User.all

    render json: @users, only: [:name, :created_at], include: { subscribed_halls: {only: [:id, :name]}}
  end

  # GET /users/1
  def show
    render json: @user, only: [:name], include: {
                                                  subscribed_halls: {only: [:id, :name]},
                                                  posts: {except: [:updated_at, :user_id, :hall_id],
                                                          include: {
                                                                    hall: {only: [:name, :id]}}
                                                        }
                                                 }
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user.to_json(only: [:name, :id]), status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.require(:user).permit(:name, :password, :password_confirmation, :role)
    end
end
