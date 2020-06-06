class AllowNullOnIds < ActiveRecord::Migration[6.0]
  def change
    change_column_null :posts, :user_id, true
    change_column_null :votes, :user_id, true
    change_column_null :comments, :user_id, true
  end
end
