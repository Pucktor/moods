class Playlist < ApplicationRecord

  belongs_to :user
  has_many :playlist_genres, dependent: :destroy
  has_many :playlist_tracks, dependent: :destroy
  has_many :genres, through: :playlist_genres
  has_many :tracks, through: :playlist_tracks

  validates :user, :color, presence: true
  validates :name, presence: true, length: { minimum: 3, maximum: 15 }
  validates :acousticness, :danceability, :energy, :valence, presence: true, numericality: { less_than_or_equal_to: 1.0, greater_than_or_equal_to: 0 }
  validates :popularity, presence: true, inclusion: { in: 0..100, message: "%{value} must be between 0 and 100" }, numericality: { only_integer: true }

end
