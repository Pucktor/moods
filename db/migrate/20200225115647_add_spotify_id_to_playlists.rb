class AddSpotifyIdToPlaylists < ActiveRecord::Migration[6.0]
  def change
    add_column :playlists, :spotify_id, :string
  end
end
