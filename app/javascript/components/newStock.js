import React, { Component } from 'react';

class NewStock extends Component {

  state= {
    ticker_symbol: "",
    quantity: 0,
    price: 0,
    balance: this.props.balance,
    user_id: this.props.user_id,
    searched_stock: null
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    }, () => this.handleConstantRenderStock())
  }

  handleConstantRenderStock = () => {
    fetch(`https://cloud.iexapis.com/stable/stock/${this.state.ticker_symbol}/quote?token=sk_69abc46b0d5346b2999a5d51f1377ea7`)
    .then( response => {
      if (!response.ok) { throw response }
      return response.json()
    })
    .then( stock => {
      this.setState({
        searched_stock: stock
      })
    })
    .catch(err => {
      this.setState({
        searched_stock:  null
      })
    })
  }

  renderStockCompany = () => {
    return(
      <div className="stock-text">
        {this.state.searched_stock.companyName && `${this.state.searched_stock.companyName}(${this.state.searched_stock.symbol})`}
      </div>
    )
  }

  renderStockPrice = () => {
    return(
      <div className="stock-text ">
        {this.state.searched_stock.latestPrice && `$${this.state.searched_stock.latestPrice.toFixed(2)} a share.`}
      </div>
    )
  }

  renderOpenPrice = () => {
    return(
      <div className="stock-text">
        {this.state.searched_stock.open && `$${this.state.searched_stock.open.toFixed(2)} at open.`}
      </div>
    )
  }
  renderNumberOfStocksUserCan = () => {
    const max = this.props.balance/this.state.searched_stock.latestPrice.toFixed(2)
    if (Math.floor(max) > 0){
      return(
        <div className="stock-text green-text">
          {this.state.searched_stock.latestPrice && `You can purchase up to ${Math.floor(max)} ${max > 1 ? "shares" : "share"}.`}
        </div>
      )
    } else {
      return(<div className="stock-text red-text">You cannot buy any shares of this stock!</div>)
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    fetch(`https://cloud.iexapis.com/stable/stock/${this.state.ticker_symbol}/quote?token=sk_69abc46b0d5346b2999a5d51f1377ea7`)
    .then( response => {
      if (!response.ok) { throw response }
      return response.json()
    })
    .then(stockinfo => {
      const stock_price = stockinfo.latestPrice
      const total_cost = stock_price * this.state.quantity
      if (total_cost > this.state.balance || this.state.quantity == 0){
        window.confirm(`You do not have enought to purchase ${this.state.quantity} shares of ${this.state.ticker_symbol}. Please lower your quantity.`)
      } else {
        fetch("http://localhost:3000/v1/transactions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            user_id: this.state.user_id,
            stock_price: stock_price,
            // transactions_type: "BUY",
            shares: Math.floor(this.state.quantity),
            ticker_symbol: this.state.ticker_symbol.toUpperCase()
          })
        })
        .then( resp => resp.json())
        .then( tra => {
          this.props.updateNewStock(total_cost)
          this.props.updateTransaction({ticker_symbol: tra.transaction.ticker_symbol, shares: tra.transaction.shares }, total_cost, tra)
          this.props.updateBudget(total_cost)
        })
        .then( xyz => {
          this.setState({
            ticker_symbol: "",
            quantity: 0,
            price: 0,
            balance: this.state.balance - total_cost,
            searched_stock: null
          })
        })
      }
    })
    .catch( err => {
        window.alert(`${this.state.ticker_symbol} is an invalid ticker symbol. Please try again.`)
    })
  }

  render() {
    return (
      <div className="new-stock-form">
        {`Cash - $${this.state.balance && this.state.balance.toFixed(2)}`}
        <br/><br/>
        <div>
          <form
            className= ""
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}>
            <input
              onChange={this.handleChange}
              className="form-input"
              id="ticker_symbol"
              placeholder="Ticker"
              value={this.state.ticker_symbol.toUpperCase()}
              required/>
            <br/>
            <input
              onChange={this.handleChange}
              className="form-input"
              id="quantity"
              placeholder="quantity"
              type="number"
              step="1"
              min="1"
              value={this.state.quantity}
              required/>
            <input
              onChange={this.handleChange}
              className="button"
              type="submit"
              value="Buy"/>
          </form>
        </div>
        <div className="stock-render-info">
          <br/><br/>
          {this.state.searched_stock && this.renderNumberOfStocksUserCan()}
          {this.state.searched_stock && this.renderStockCompany()}
          {this.state.searched_stock && this.renderStockPrice()}
          {this.state.searched_stock && this.renderOpenPrice()}
        </div>
      </div>
    )
  }
}

export default NewStock
