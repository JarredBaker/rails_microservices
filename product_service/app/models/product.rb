class Product < ApplicationRecord
  monetize :price_cents

  validates :name, :description, :stock_quantity, presence: true
end
