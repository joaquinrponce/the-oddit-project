class AddOwnerToHalls < ActiveRecord::Migration[6.0]
  def change
    add_column :halls, :owner_id, :integer
  end
end
