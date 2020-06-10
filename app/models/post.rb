class Post < ApplicationRecord
  mount_uploader :image, ImageUploader

  scope :subscribed, -> (halls) { where hall_id: halls }

  belongs_to :user
  belongs_to :hall
  has_many :comments
  accepts_nested_attributes_for :comments

  has_many :votes, as: :voteable

  def score
    votes.sum(:value)
  end

  def upvotes
    votes.where(value: 1).count
  end

  def downvotes
    votes.where(value: -1).count
  end

  def set_url default
    return if self.url
    self.update_attribute(:url, default)
  end

end
