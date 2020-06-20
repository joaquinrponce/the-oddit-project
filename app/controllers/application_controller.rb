class ApplicationController < ActionController::API
  include Knock::Authenticable

  def fallback_index_html
    render :file => 'public/client/index.html'
  end
end
