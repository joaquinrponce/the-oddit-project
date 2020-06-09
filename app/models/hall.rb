class Hall < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: :slugged
  has_many :subscriptions
  has_many :members, through: :subscriptions
  has_many :posts
end
