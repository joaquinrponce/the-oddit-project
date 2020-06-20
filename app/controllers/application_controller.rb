class ApplicationController < ActionController::API
  include Knock::Authenticable

  def fallback_index_html
    render :file => 'client/build/index.html'
  end
end
