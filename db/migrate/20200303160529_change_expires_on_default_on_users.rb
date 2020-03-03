class ChangeExpiresOnDefaultOnUsers < ActiveRecord::Migration[6.0]
  def change
    change_column_default(:users, :expires_on, DateTime.now - 1)
  end
end
