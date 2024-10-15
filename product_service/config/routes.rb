Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  scope :products do
    resources :products, only: [:index] do
      member do
        get 'check_stock'
        post 'update_stock'
      end
    end
  end
end
