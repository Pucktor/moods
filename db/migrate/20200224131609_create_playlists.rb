class CreatePlaylists < ActiveRecord::Migration[6.0]
  def change
    create_table :playlists do |t|
      t.string :name
      t.float :acousticness
      t.float :danceability
      t.float :energy
      t.float :valence
      t.float :popularity
      t.string :image_url

      t.timestamps
    end
  end
end
