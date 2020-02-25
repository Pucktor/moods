class Track < ApplicationRecord
  has_many :playlist_tracks
  has_many :playlists, through: :playlist_tracks
  validates :title, :spotify_track_id, :artist, :album, presence: true
end
