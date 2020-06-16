class VotesController < ApplicationController

  before_action :authenticate_user, only: [:create, :destroy]

  def search
    @vote = Vote.find_by(vote_params)

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

  private

  def vote_params
    params.permit(:user_id, :voteable_id, :voteable_type, :value)
  end

end
