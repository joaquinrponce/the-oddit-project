class Hall < ApplicationRecord
  has_many :subscriptions
  has_many :members, through: :subscriptions
  has_many :posts
end
