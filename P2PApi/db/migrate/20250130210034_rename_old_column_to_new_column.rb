class RenameOldColumnToNewColumn < ActiveRecord::Migration[8.0]
  def change
    rename_column :bids, :type, :kind
  end
end
