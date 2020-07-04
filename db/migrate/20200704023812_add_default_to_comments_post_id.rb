class AddDefaultToCommentsPostId < ActiveRecord::Migration[6.0]
  def change
    change_column_default :comments, :post_id, 0
  end
end
