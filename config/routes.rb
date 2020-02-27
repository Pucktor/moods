Rails.application.routes.draw do

  root to: 'playlists#index'
  
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

  resources :playlists
end
