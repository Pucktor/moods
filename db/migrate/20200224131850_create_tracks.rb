class CreateTracks < ActiveRecord::Migration[6.0]
  def change
    create_table :tracks do |t|
      t.string :title
      t.string :artist
      t.string :album
      t.string :image_url
      t.string :spotify_track_id

      t.timestamps
    end
  end
end
