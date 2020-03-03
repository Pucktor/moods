class AddReadToPlaylistTracks < ActiveRecord::Migration[6.0]
  def change
    add_column :playlist_tracks, :read, :boolean, default: false
  end
end
