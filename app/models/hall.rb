class Hall < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: :slugged
  has_many :subscriptions
  has_many :members, through: :subscriptions
  has_many :posts, dependent: :destroy
  has_many :moderationships, dependent: :destroy
  has_many :moderators, through: :moderationships

  belongs_to :owner, class_name: 'User'

  before_validation :downcase_name
  validate :owner_exists
  validate :name_is_valid
  validates :name, presence: true, uniqueness: { case_sensitive: false }

  after_create :create_owner_moderationship

  def post_count
    posts.count
  end

  def member_count
    members.count
  end

  private

  def downcase_name
    self.name = self.name.downcase
  end

  def owner_exists
    errors.add(:owner, 'must exist') if !User.exists?(id: self.owner_id)
  end

  def name_is_valid
    errors.add(:name, "must contain no spaces, and only letters and numbers") if !self.name.match(/^\S[a-z0-9]+$/)
    errors.add(:name, "must be between 5 and 30 characters") if !name.length.between?(5, 30)
  end

  def create_owner_moderationship
    Moderationship.create(moderator_id: self.owner_id, hall_id: self.id, owner: true)
  end

end
