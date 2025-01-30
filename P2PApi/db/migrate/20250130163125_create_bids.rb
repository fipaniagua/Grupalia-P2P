class CreateBids < ActiveRecord::Migration[8.0]
  def change
    create_table :bids do |t|
      t.text :type
      t.float :amount
      t.date :publication
      t.text :state
      t.text :contact
      t.text :owner
      t.text :bidder

      t.timestamps
    end
  end
end
