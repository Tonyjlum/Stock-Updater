class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :balance, :transactions, :stocks
  def transactions
    object.transactions.map { |transaction|
      {
        id: transaction.id,
        ticker_symbol: transaction.stock.ticker_symbol,
        stock_price: transaction.stock_price,
        shares: transaction.shares,
        transactions_type: transaction.transactions_type
      }
    }
  end

  def stocks
    uniq = []
    object.stocks.map do |stock|
      if uniq.include?(stock.ticker_symbol)
        next
      else
        uniq << stock.ticker_symbol
      end
      count = stock.transactions.map{ |s| s.shares}.reduce(:+)
      {ticker_symbol: stock.ticker_symbol, total_shares: count}
    end.select{ |s| s != nil}
  end


end
