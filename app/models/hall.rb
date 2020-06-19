class Hall < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: :slugged
  has_many :subscriptions
  has_many :members, through: :subscriptions
  has_many :posts

  def post_count
    posts.count
  end

  def member_count
    members.count
  end
  
end
