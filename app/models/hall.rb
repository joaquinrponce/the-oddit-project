class Hall < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: :slugged
  has_many :subscriptions
  has_many :members, through: :subscriptions
  has_many :posts, dependent: :destroy
  has_many :moderationships, dependent: :destroy
  has_many :moderators, through: :moderationships

  belongs_to :owner, class_name: 'User'

  before_save :downcase_name
  after_create :create_owner_moderationship
  validate :owner_exists

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

  def owner_exists
    User.exists?(id: self.owner_id)
  end

  def create_owner_moderationship
    Moderationship.create(moderator_id: self.owner_id, hall_id: self.id, owner: true)
  end

end
