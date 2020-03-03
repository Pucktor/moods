class AddTokenExpirationDateToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :expires_on, :datetime, default: DateTime.now
  end
end
