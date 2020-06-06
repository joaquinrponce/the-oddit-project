class User < ApplicationRecord
  has_secure_password

  has_many :posts, dependent: :nullify
  has_many :comments, dependent: :nullify
  has_many :votes, dependent: :nullify

  validates :name, presence: true, uniqueness: { case_sensitive: false }, on: :create

  def self.from_token_request request
    name = request.params["auth"] && request.params["auth"]["name"]
    self.find_by name: name
  end

end
