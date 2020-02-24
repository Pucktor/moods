class Genre < ApplicationRecord
  validates :name, presence: true, length: { minimum: 3, maximum: 30 }
end
