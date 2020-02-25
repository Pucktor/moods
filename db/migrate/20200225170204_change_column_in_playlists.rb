class ChangeColumnInPlaylists < ActiveRecord::Migration[6.0]
  def change
    change_column :playlists, :popularity, :integer
  end
end
