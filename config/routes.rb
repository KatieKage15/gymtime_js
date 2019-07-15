Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
    resources :instructors
    resources :clients
    root to: "instructors#welcome"
    #get 'clients/:id/client_data', to: 'clients#client_data'
end
