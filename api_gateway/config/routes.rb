Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  get '/users/*path', to: 'gateway#proxy', defaults: { service: 'user_service' }
  get '/products/*path', to: 'gateway#proxy', defaults: { service: 'product_service' }
  get '/orders/*path', to: 'gateway#proxy', defaults: { service: 'order_service' }

  post '/users/*path', to: 'gateway#proxy', defaults: { service: 'user_service' }
  post '/products/*path', to: 'gateway#proxy', defaults: { service: 'product_service' }
  post '/orders/*path', to: 'gateway#proxy', defaults: { service: 'order_service' }
end
