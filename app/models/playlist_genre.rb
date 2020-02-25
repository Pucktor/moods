class PlaylistGenre < ApplicationRecord
  belongs_to :genre
  belongs_to :playlist
end
