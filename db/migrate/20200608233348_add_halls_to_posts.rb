class AddHallsToPosts < ActiveRecord::Migration[6.0]
  def change
    add_reference :posts, :hall, null: false, foreign_key: true
  end
end
