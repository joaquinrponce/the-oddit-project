class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :post
  belongs_to :parent, class_name: 'Comment', optional: true

  has_many :votes, as: :voteable
  has_many :replies, class_name: 'Comment', foreign_key: :parent_id, dependent: :destroy

  def score
    votes.sum(:value)
  end

  def upvotes
    votes.where(value: 1).count
  end

  def downvotes
    votes.where(value: -1).count
  end
  
end
