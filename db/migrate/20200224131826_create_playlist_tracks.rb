class CreatePlaylistTracks < ActiveRecord::Migration[6.0]
  def change
    create_table :playlist_tracks do |t|

      t.timestamps
    end
  end
end
