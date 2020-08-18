class UsersController < ApiController
  before_action :set_user, only: [:show, :update, :content, :destroy]
  skip_before_action :verify_authenticity_token, raise: false
  before_action :authenticate_user, only: [:update, :destroy]
  before_action :authorize_user_for_update, only: [:update]
  before_action :authorize_admin_and_user, only: [:destroy]
  # GET /users
  def index
    @users = User.all

    render json: @users, only: [:name, :created_at], include: { subscribed_halls: {only: [:id, :name]}}
  end

  # GET /users/1
  def show
    page = params[:page].present? ? params[:page].to_i : 1
    @content = @user.posts.order("created_at DESC") + @user.comments.order("created_at DESC")
    @content = @content.sort { |a, b| b.created_at <=> a.created_at }
    @content = paginate_results(@content, page: page)
    @content = serialize_each(@content)
    user = ActiveModelSerializers::SerializableResource.new(@user).serializable_hash
    user[:content] = @content
    user[:last_page] = @content.length < 10
    render json: user
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user.to_json(methods:[:signup_token], only: [:name, :id, :role]), status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: {user: {name: @user.name, id: @user.id}}, stauts: 200
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
      @user = User.friendly.find(params[:id] || params[:user_id])
    end

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.require(:user).permit(:name, :password, :password_confirmation)
    end

    def paginate_results(array, params = {page: 1})
      array[((params[:page] - 1) * 10)...(params[:page] * 10)]
    end

    def serialize_each(array)
      array.map do |record|
        if record.instance_of?(Post)
          ActiveModelSerializers::SerializableResource.new(record, include: 'user,hall')
        else
          ActiveModelSerializers::SerializableResource.new(record, include: 'post,post.hall')
        end
      end
    end

    def authorize_user_for_update
      render json: {errors: {authorization: "You are not allowed to update or modify this user."}}, status: 401 if current_user != @user
    end

    def authorize_admin_and_user
      render json: {errors: {authorization: "You are not allowed to update or modify this user."}}, status: 401 if current_user != @user && !current_user.admin?
    end
end
