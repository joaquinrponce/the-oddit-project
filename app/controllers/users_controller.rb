class UsersController < ApiController
  before_action :set_user, only: [:show, :update, :content, :destroy]
  skip_before_action :verify_authenticity_token, raise: false

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

  def content
    @content = @user.posts + @user.comments
    @content = paginate_results(@content)
    @content = serialize_each(@content)
    #@serialized_comment = ActiveModelSerializers::SerializableResource.new(@comment, include: 'post,post.hall')
    #@post = @user.posts.first
    #@serialized_post = ActiveModelSerializers::SerializableResource.new(@post, include: 'user,hall')

    render json: {content: @content}
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

end
