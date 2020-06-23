class CommentSerializer < ActiveModel::Serializer
  attributes :id, :body, :score
  has_many :replies, serializer: CommentSerializer
  belongs_to :user

  class UserSerializer < ActiveModel::Serializer
    attributes :id, :name
  end

end
