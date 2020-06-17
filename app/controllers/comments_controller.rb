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

  private

  def comment_params
    params.require(:comment).permit(:user_id, :post_id, :parent_id, :body)
  end

end
