class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :url, :image, :body, :score, :user, :comments_count

  has_many :replies, serializer: CommentSerializer
  belongs_to :hall
  belongs_to :user

  class HallSerializer < ActiveModel::Serializer
    attributes :id, :name
  end

  class UserSerializer < ActiveModel::Serializer
    attributes :id, :name
  end

end
