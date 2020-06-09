class HallsController < ApplicationController

  def index
    @halls = Hall.all

    render json: @halls
  end

  def show
    @hall = Hall.friendly.find(params[:id])

    render json: @hall.to_json(include: {members: {only: [:name]}})
  end

end
