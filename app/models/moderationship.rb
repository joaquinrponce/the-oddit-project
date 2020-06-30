class Moderationship < ApplicationRecord
  
  belongs_to :moderator, class_name: 'User'
  belongs_to :hall
end
