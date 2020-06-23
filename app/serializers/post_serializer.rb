class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :url, :image, :body, :score, :user

  has_many :comments, serializer: CommentSerializer
  belongs_to :hall
  belongs_to :user

  class HallSerializer < ActiveModel::Serializer
    attributes :id, :name
  end

  class UserSerializer < ActiveModel::Serializer
    attributes :id, :name
  end

end
