class V1::TransactionsController < ApplicationController
  def index
    @transactions = Transaction.all

    render json: @transactions
  end

  def show
    @transaction = Transaction.find(params[:id])
    render json: @transaction
  end

  def create
    @stock = Stock.find_by(ticker_symbol: params["ticker_symbol"])
    if @stock == nil
      @stock = Stock.create(ticker_symbol: params["ticker_symbol"])
    end
    @transaction = Transaction.create(
      user_id: params["user_id"],
      stock_id: @stock.id,
      stock_price: params["stock_price"].to_f,
      shares: params["shares"].to_i
    )
    if @transaction
      transaction_cost = @transaction.stock_price * @transaction.shares

      @user = User.find(params["user_id"])
      @user.update(balance: @user.balance - transaction_cost)
    end
    render json: @transaction
  end

  private
  def transaction_params
    params.require(:user).permit(:email, :password, :name)
  end

end
