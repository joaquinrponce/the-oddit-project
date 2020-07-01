class Post < ApplicationRecord
  mount_uploader :image, ImageUploader

  scope :subscribed, -> (halls) { where hall_id: halls }

  belongs_to :user
  belongs_to :hall
  has_many :comments, -> { order('created_at DESC')}, as: :commentable, dependent: :destroy
  accepts_nested_attributes_for :comments

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
    count = self.comments.count
    self.comments.each do |comment|
      count += comment.replies_count
    end
    count
  end

end
