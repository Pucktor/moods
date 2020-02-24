class RemoveSpotifyGenreIdFromGenres < ActiveRecord::Migration[6.0]
  def change

    remove_column :genres, :spotify_genre_id, :integer
  end
end
