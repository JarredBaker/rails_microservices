Rails.application.routes.draw do
  get '/users/*path', to: 'gateway#proxy', defaults: { service: 'user_service' }
  get '/products/*path', to: 'gateway#proxy', defaults: { service: 'product_service' }
  get '/orders/*path', to: 'gateway#proxy', defaults: { service: 'order_service' }

  post '/users/*path', to: 'gateway#proxy', defaults: { service: 'user_service' }
  post '/products/*path', to: 'gateway#proxy', defaults: { service: 'product_service' }
  post '/orders/*path', to: 'gateway#proxy', defaults: { service: 'order_service' }

  delete '/users/*path', to: 'gateway#proxy', defaults: { service: 'user_service' }

  get '/rails/active_storage/blobs/*path', to: 'gateway#proxy_image'
end
