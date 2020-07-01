class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :commentable, polymorphic: true
  belongs_to :post

  has_many :votes, as: :voteable
  has_many :replies, as: :commentable, class_name: 'Comment', dependent: :destroy
  before_validation :set_post_id

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

  def hall
    self.post.hall
  end

  private

  def set_post_id
    if self.commentable_type == 'Post'
      self.post_id = self.commentable_id
    else
      self.post_id = self.commentable.post.id
    end
  end

end
