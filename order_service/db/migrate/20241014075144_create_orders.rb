class CreateOrders < ActiveRecord::Migration[7.0]
  def change
    create_table :orders, id: :uuid do |t|
      t.uuid :product_id, null: false
      t.uuid :user_id, null: false
      t.integer :quantity, null: false, default: 1
      t.integer :status, null: false, default: 0

      t.timestamps
    end
  end
end
