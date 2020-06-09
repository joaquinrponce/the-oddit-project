class CreateSubscriptions < ActiveRecord::Migration[6.0]
  def change
    create_table :subscriptions do |t|
      t.integer :hall_id
      t.integer :member_id

      t.timestamps
    end
  end
end
