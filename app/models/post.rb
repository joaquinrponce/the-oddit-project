class Post < ApplicationRecord
  mount_uploader :image, ImageUploader

  scope :subscribed, -> (halls) { where hall_id: halls }

  belongs_to :user
  belongs_to :hall
  has_many :replies, -> { order('created_at DESC')}, class_name: 'Comment', as: :commentable, dependent: :destroy
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
    count = self.replies.count
    self.replies.each do |reply|
      count += reply.replies_count
    end
    count
  end

end
