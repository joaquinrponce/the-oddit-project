class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :commentable, polymorphic: true

  has_many :votes, as: :voteable
  has_many :replies, as: :commentable, class_name: 'Comment', dependent: :destroy

  def score
    votes.sum(:value)
  end

  def upvotes
    votes.where(value: 1).count
  end

  def downvotes
    votes.where(value: -1).count
  end

  def replies_count
    count = self.replies.count
    self.replies.each do |reply|
      count += reply.replies_count
    end
    count
  end

end
