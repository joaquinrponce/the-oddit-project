class PostsController < ApiController

  before_action :authenticate_user, only: [:feed, :create, :destroy]
  before_action :set_post, only: [:show, :update, :destroy]
  before_action :get_hall

  # GET /posts
  def index
    @posts = @hall.present? ? @hall.posts.order("created_at DESC") : Post.all.order("created_at DESC")

    render json: @posts, include: 'hall,user'
  end

  # GET /posts/1
  def show
    if @hall.present? && @post.hall == @hall
      render json: @post, include: 'comments.user,comments.replies.**,user,hall'
    elsif @hall.present? && @post.hall != @hall
      render json: {error: "Not Found", status: 404, exception: "Could not find post with ID '#{@post.id}' in hall with ID '#{@hall.slug}'"}.to_json
    else
      render json: @post
    end
  end

  def feed
    redirect_to action: 'index' if !current_user.present?
    @posts = Post.subscribed(current_user.subscribed_halls)
    render json: @posts
  end

  # POST /posts
  def create
    @post = Post.new(post_params)
    @post.hall = @hall if @hall.present?

    if @post.save
      render json: @post, status: :created, location: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  def update
    if current_user.present? && (current_user.admin? || current_user.id === @post.user_id )
      if @post.update(post_params)
        render json: @post, status: 200
      else
        render json: @post, status: :unprocessable_entity
      end
    else
      render json: @post, status: 401
    end
  end

  # DELETE /posts/1
  def destroy
    if current_user.present? && (current_user.admin? || current_user.id === @post.user_id )
      @post.destroy
    else
      render json: @post, status: 401
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def post_params
      params.permit(:title, :url, :image, :body, :user_id, :hall_id)
    end

    def get_hall
      @hall = Hall.friendly.find(params[:hall_id]) if params[:hall_id].present?
    end

    def authenticate_user
      super
      puts current_user
    end
end
