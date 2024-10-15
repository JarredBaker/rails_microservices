class ChangeUserPrimaryKeyType < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :id
    add_column :users, :id, :uuid, default: 'gen_random_uuid()', null: false, primary_key: true
  end
end
