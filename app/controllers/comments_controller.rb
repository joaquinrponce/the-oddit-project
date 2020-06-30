class CommentsController < ApiController
  before_action :authenticate_user, only: [:create, :update, :destroy]
  before_action :set_comment, only: [:show, :update, :destroy]

  def create
    @comment = Comment.new(comment_params)

    if @comment.save
      render json: @comment, status: :created, location: @comment
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  def show
    render json: @comment, methods: [:score, :upvotes, :downvotes], include: {replies: {}, user: {only: [:id, :name]}}, except: [:user_id]
  end

  def destroy
    if current_user.present? && (current_user.admin? || current_user.id === @comment.user_id || current_user.moderated_halls.include?(@comment.get_hall))
      @comment.destroy
    else
      render json: @comment, status: 401
    end
  end

  def update
    if current_user.present? && (current_user.admin? || current_user.id === @comment.user_id )
      if @comment.update(comment_params)
        render json: @comment, status: 200
      else
        render json: @comment, status: :unprocessable_entity
      end
    else
      render json: @comment, status: 401
    end
  end

  private

  def set_comment
    @comment = Comment.find(params[:id])
  end

  def comment_params
    params.require(:comment).permit(:user_id, :commentable_id, :commentable_type, :body)
  end

end
