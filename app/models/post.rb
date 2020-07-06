class Post < ApplicationRecord
  mount_uploader :image, ImageUploader

  scope :subscribed, -> (halls) { where hall_id: halls }

  belongs_to :user
  belongs_to :hall
  has_many :replies, -> { order('created_at DESC')}, class_name: 'Comment', as: :commentable, dependent: :destroy
  has_many :comments
  accepts_nested_attributes_for :comments
  validates :title, presence: true 

  has_many :votes, as: :voteable

  def score
    votes.sum(:value) || 0
  end

  def upvotes
    votes.where(value: 1).count
  end

  def downvotes
    votes.where(value: -1).count
  end

  def comments_count
    self.comments.count
  end

end
