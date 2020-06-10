Rails.application.routes.draw do

  scope '/api' do
    post 'user_token' => 'user_token#create'
    get '/posts/feed' => 'posts#feed'
    resources :users
    resources :posts
    resources :comments
    resources :votes
    resources :halls do
      resources :posts
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
