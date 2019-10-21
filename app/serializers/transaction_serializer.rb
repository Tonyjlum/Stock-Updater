class TransactionSerializer < ActiveModel::Serializer
  attributes :id, :stock_price, :shares, :transactions_type, :ticker_symbol, :created_at

  def ticker_symbol
    object.stock.ticker_symbol
  end

end
