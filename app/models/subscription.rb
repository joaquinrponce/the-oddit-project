class Subscription < ApplicationRecord
  belongs_to :member, class_name: 'User'
  belongs_to :hall
end
