class CreateTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :transactions do |t|
      t.integer :user_id
      t.integer :stock_id
      t.float  :stock_price
      t.integer :shares
      #to track if the transactions was to buy or sell.
      t.string :transactions_type, :default => "BUY"
      t.timestamps
    end
  end
end
