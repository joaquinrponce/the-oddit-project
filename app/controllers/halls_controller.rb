class HallsController < ApplicationController

  def index
    @halls = Hall.all

    render json: @halls.to_json(methods: [:post_count, :member_count])
  end

  def show
    @hall = Hall.friendly.find(params[:id])

    render json: @hall.to_json(methods: [:post_count], include: {members: {only: [:name]}})
  end

end
