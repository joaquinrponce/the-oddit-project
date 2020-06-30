class User < ApplicationRecord
  has_secure_password

  has_many :posts, dependent: :nullify
  has_many :comments, dependent: :nullify
  has_many :votes, dependent: :nullify
  has_many :subscriptions, foreign_key: 'member_id'
  has_many :subscribed_halls, through: :subscriptions, source: :hall
  has_many :moderationships, foreign_key: 'moderator_id'
  has_many :moderated_halls, through: :moderationships, source: :hall

  validates :name, presence: true, uniqueness: { case_sensitive: false }, on: :create

  def self.from_token_request request
    name = request.params["auth"] && request.params["auth"]["name"]
    self.find_by name: name
  end

  def self.from_token_payload payload
      self.find_by id: payload['sub']['id']
  end

  def to_token_payload
    {sub: {id: self.id, name: self.name, role: self.role}}
  end

  def signup_token
    Knock::AuthToken.new(payload: {sub: {id: self.id, name: self.name, role: self.role}}).token
  end

  def admin?
    self.role == "admin"
  end

end
