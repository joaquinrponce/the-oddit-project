class PostsController < ApplicationController
  before_action :set_post, only: [:show, :update, :destroy]
  before_action :get_hall

  # GET /posts
  def index
    @posts = @hall.present? ? @hall.posts : Post.all

    render json: @posts.to_json(methods: [:score, :upvotes, :downvotes], include: {comments: {}, hall: {}, user: {only: [:id, :name]}}, except: [:user_id, :updated_at, :hall_id])
  end

  # GET /posts/1
  def show
    render json: @post.to_json(methods: [:score, :upvotes, :downvotes], include: {comments: {}, hall: {}, user: {only: [:id, :name]}}, except: [:user_id, :updated_at, :hall_id])
  end

  # POST /posts
  def create
    @post = Post.new(post_params)

    if @post.save
      @post.set_url("https://#{request.host_with_port}/api/posts/#{@post.id}")
      render json: @post, status: :created, location: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  def update
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1
  def destroy
    @post.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def post_params
      params.require(:post).permit(:title, :url, :image, :body, :user_id, :hall_id)
    end

    def get_hall
      @hall = Hall.friendly.find(params[:hall_id]) if params[:hall_id].present?
    end
end
