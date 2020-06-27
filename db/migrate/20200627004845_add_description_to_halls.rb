class AddDescriptionToHalls < ActiveRecord::Migration[6.0]
  def change
    add_column :halls, :description, :text
  end
end
