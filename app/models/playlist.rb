class Playlist < ApplicationRecord
  belongs_to :user
  has_many :genres, through: :playlist_genres
  has_many :tracks, through: :playlist_tracks
  validates :name, presence: true, length: { minimum: 3, maximum: 20 }
end
