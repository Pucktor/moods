class AddColorToPlaylists < ActiveRecord::Migration[6.0]
  def change
    add_column :playlists, :color, :string
  end
end
