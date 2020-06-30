class CreateModerationships < ActiveRecord::Migration[6.0]
  def change
    create_table :moderationships do |t|
      t.integer :hall_id
      t.integer :moderator_id

      t.timestamps
    end
  end
end
