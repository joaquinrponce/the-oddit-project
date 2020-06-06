class CreatePosts < ActiveRecord::Migration[6.0]
  def change
    create_table :posts do |t|
      t.string :title
      t.string :url, default: nil
      t.string :image, default: nil
      t.text :body, default: nil
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
