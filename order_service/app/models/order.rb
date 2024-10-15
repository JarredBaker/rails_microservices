class Order < ApplicationRecord
  validates :quantity, :user_id, :product_id, presence: true

  enum status: { processing: 0, completed: 1, cancelled: 2, admin_cancelled: 3 }
end
