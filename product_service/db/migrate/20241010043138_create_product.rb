class CreateProduct < ActiveRecord::Migration[7.0]
  def change
    create_table :products, id: :uuid do |t|
      t.string :name, null: false
      t.text :description, default: ""
      t.integer :stock_quantity, null: false, default: 0
      t.uuid :user_id, null: false, type: :uuid

      t.timestamps
    end

    add_monetize :products, :price
  end
end
