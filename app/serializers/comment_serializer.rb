class CommentSerializer < ActiveModel::Serializer
  attributes :id, :body, :created_at
  attribute :score
  has_many :replies, serializer: CommentSerializer
  belongs_to :user
  belongs_to :post

  class UserSerializer < ActiveModel::Serializer
    attributes :id, :name
  end

  class PostSerializer < ActiveModel::Serializer
    attributes :id, :title
    belongs_to :hall

    class HallSerializer < ActiveModel::Serializer
      attributes :id, :name
    end
  end


end
