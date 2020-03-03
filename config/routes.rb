Rails.application.routes.draw do

  root to: 'playlists#index'

  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

  resources :playlists do
    get '/refresh', to: 'playlists#refresh'
  end

  # resources :playlists, only: :show do
  #   get '/refresh', to: 'playlists#refresh'
  # end

end
