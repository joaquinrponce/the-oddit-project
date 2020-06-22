class SubscriptionsController < ApiController

  before_action :get_hall

  def create
    @subscription = @hall.subscriptions.new(member_id: subscription_params[:member_id])

    if @subscription.save
      render json: @subscription, status: :created, location: @subscription
    else
      render json: @subscription.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @subscription = Subscription.find_by(member_id: subscription_params[:member_id], hall_id: @hall.id)
    @subscription.destroy
  end

  def search
    @subscription = Subscription.find_by(hall_id: @hall.id, member_id: search_params[:member_id])

    render json: @subscription
  end

  private

  def subscription_params
    params.require(:subscription).permit(:hall_id, :member_id)
  end

  def search_params
    params.permit(:hall_id, :member_id)
  end

  def get_hall
    @hall = Hall.friendly.find(params[:subscription][:hall_id]) if params[:subscription].present?
    @hall = Hall.friendly.find(params[:hall_id]) if params[:hall_id].present?
  end

end
