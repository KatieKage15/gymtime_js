Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
    resources :instructors, only: [:new, :create, :show, :edit, :destroy]
    resources :clients, only: [:new, :show]
    resources :users, only: [:new, :create, :show, :edit, :destroy]
    root to: "instructors#welcome"

    get '/custom_query', to: 'clients#custom_query'
    get 'clients/:id/next', to: 'clients#next'
    get '/signin', to: 'sessions#new'
    post '/signin', to: 'sessions#create'
    delete '/logout', to: 'sessions#destroy'
    #get 'clients/:id/client_data', to: 'clients#client_data'
end
