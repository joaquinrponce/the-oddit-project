class ChangeCommentsToPolymorphic < ActiveRecord::Migration[6.0]
  def change
    rename_column :comments, :post_id, :commentable_id
    remove_column :comments, :parent_id
    add_column :comments, :commentable_type, :string
  end
end
