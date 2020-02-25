class Genre < ApplicationRecord
  has_many :playlist_genres
  has_many :playlists, through: :playlist_genres
  validates :name, presence: true, length: { minimum: 3, maximum: 30 }
end
