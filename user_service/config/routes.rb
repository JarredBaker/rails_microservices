Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  devise_for :users, path: '', path_names: {
    sign_in: 'users/login',
    sign_out: 'users/logout',
    registration: 'users/signup'
  }, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
  post 'validate_token', to: 'tokens#validate_token'
end
