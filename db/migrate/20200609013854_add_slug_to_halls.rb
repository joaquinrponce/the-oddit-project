class AddSlugToHalls < ActiveRecord::Migration[6.0]
  def change
    add_column :halls, :slug, :string
    add_index :halls, :slug, unique: true
  end
end
