class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :score, :comment_count, :post_count

  has_many :owned_halls
  has_many :moderated_halls
  has_many :subscribed_halls

  class HallSerializer < ActiveModel::Serializer
    attributes :id, :name
  end

end
