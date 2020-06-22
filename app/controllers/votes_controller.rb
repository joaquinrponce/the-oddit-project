class VotesController < ApiController
  before_action :set_vote, only: [:update, :destroy]
  before_action :authenticate_user, only: [:create, :update, :destroy]

  def search
    @vote = Vote.find_by(search_params)

    render json: @vote
  end

  def create
    @vote = Vote.new(vote_params)

    if @vote.save
      render json: @vote, status: :created, location: @vote
    else
      render json: @vote.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @vote.destroy
  end

  def update
    if @vote.update(vote_params)
      render json: @vote
    else
      render json: @vote.errors, status: :unprocessable_entity
    end
  end

  private

  def vote_params
    params.require(:vote).permit(:user_id, :voteable_id, :voteable_type, :value)
  end

  def search_params
    params.permit(:user_id, :voteable_id, :voteable_type, :value)
  end

  def set_vote
    @vote = Vote.find(params[:id])
  end


end
