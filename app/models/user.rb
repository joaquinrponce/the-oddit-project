class User < ApplicationRecord
  has_secure_password
  extend FriendlyId
  friendly_id :name, use: :slugged

  has_many :posts, dependent: :nullify
  has_many :comments, dependent: :nullify
  has_many :votes, dependent: :nullify
  has_many :subscriptions, foreign_key: 'member_id'
  has_many :subscribed_halls, through: :subscriptions, source: :hall
  has_many :moderationships, foreign_key: 'moderator_id'
  has_many :moderated_halls, through: :moderationships, source: :hall
  has_many :owned_halls, class_name: 'Hall', foreign_key: 'owner_id'

  validates :name, presence: true, uniqueness: { case_sensitive: false }, on: :create
  before_save :downcase_name

  def self.from_token_request request
    name = request.params["auth"] && request.params["auth"]["name"]
    self.find_by name: name
  end

  def self.from_token_payload payload
      self.find_by id: payload['sub']['id']
  end

  def to_token_payload
    {sub: {id: self.id, name: self.name, role: self.role, moderated_halls: self.moderated_hall_ids, owned_halls: self.owned_hall_ids}}
  end

  def signup_token
    Knock::AuthToken.new(payload: self.to_token_payload).token
  end

  def admin?
    self.role == "admin"
  end

  def moderated_hall_ids
    self.moderated_halls.map {|hall| hall.id}
  end

  def owned_hall_ids
    self.owned_halls.map {|hall| hall.id}
  end

  def score
    score = 0
    self.posts.each {|post| score += post.score}
    self.comments.each {|comment| score += comment.score }
    return score
  end

  def post_count
    self.posts.count
  end

  def comment_count
    self.comments.count
  end

  private

  def downcase_name
    self.name.downcase
  end

end
