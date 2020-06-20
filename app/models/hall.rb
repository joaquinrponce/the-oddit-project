class Hall < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: :slugged
  has_many :subscriptions
  has_many :members, through: :subscriptions
  has_many :posts

  before_save :downcase_name

  def post_count
    posts.count
  end

  def member_count
    members.count
  end

  private

  def downcase_name
    self.name.downcase
  end

end
