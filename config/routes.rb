Sentido::Application.routes.draw do
  resources :user, :defaults => { :format => 'json' }

  get 'auth/:provider/callback', to: 'sessions#create'
  get 'auth/failure', to: redirect('/')
  get 'signout', to: 'sessions#destroy', as: 'signout'

  resources :sessions, only: [:create, :destroy]
  resource :home, only: [:show]

  root to: "home#show"

  resources :trails

  match '/trails/around/:sw_lon/:sw_lat/:ne_lon/:ne_lat' => 'trails#around', :constraints => {:sw_lon => /\-*\d+.\d+/ , :sw_lat => /\-*\d+.\d+/, :ne_lon => /\-*\d+.\d+/ , :ne_lat => /\-*\d+.\d+/}
end
