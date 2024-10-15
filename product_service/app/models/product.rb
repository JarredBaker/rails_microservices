class Product < ApplicationRecord
  has_one_attached :image
  monetize :price_cents

  validates :name, :description, :stock_quantity, presence: true
end
