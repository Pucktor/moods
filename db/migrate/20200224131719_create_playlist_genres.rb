class CreatePlaylistGenres < ActiveRecord::Migration[6.0]
  def change
    create_table :playlist_genres do |t|

      t.timestamps
    end
  end
end
