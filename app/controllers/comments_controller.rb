class CommentsController < ApplicationController
  before_action :authenticate_user, only: [:create, :update, :destroy]

  def create
    @comment = Comment.new(comment_params)

    if @comment.save
      render json: @comment, status: :created, location: @comment
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  def show
    @comment = Comment.find(params[:id])

    render json: @comment, include: :replies
  end

  private

  def comment_params
    params.require(:comment).permit(:user_id, :commentable_id, :commentable_type, :body)
  end

end
