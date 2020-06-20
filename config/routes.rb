Rails.application.routes.draw do

  scope '/api' do
    post 'user_token' => 'user_token#create'
    get '/posts/feed' => 'posts#feed'
    get '/votes/search' => 'votes#search'
    get '/subscriptions/search' => 'subscriptions#search'
    resources :users
    resources :posts
    resources :comments
    resources :votes
    resources :subscriptions
    resources :halls do
      resources :posts
    end
  end

  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
