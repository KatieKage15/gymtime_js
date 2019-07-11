Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
    resources :instructors, only: [:show]
    resources :clients, only: [:index, :show, :new, :create, :edit]
    root to: 'clients#index'
    #get 'clients/:id/client_data', to: 'clients#client_data'
end
