class AddOwnerToModerationships < ActiveRecord::Migration[6.0]
  def change
    add_column :moderationships, :owner, :boolean, default: false
  end
end
