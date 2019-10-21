import React, { Component } from 'react';

class PortfolioStockDisplay extends Component {
  state = {
    stockinfo: null,
    price: 0.00,
    open: 0.00
  }

  componentDidMount(){
    fetch(`https://cloud.iexapis.com/stable/stock/${this.props.stock.ticker_symbol}/quote?token=sk_69abc46b0d5346b2999a5d51f1377ea7`)
    .then( res => res.json())
    .then( stockinfo => {
      this.setState({
        stockinfo: stockinfo,
        price: stockinfo.latestPrice,
        open: stockinfo.previousClose
      })
    })
  }

  render() {
    return (
      <div className={`stock-display display-flex ${this.state.price > this.state.open && "green-text"} ${this.state.price < this.state.open && "red-text"} ${this.state.price == this.state.open && "grey-text"}`}>
        {this.state.price > this.state.open && "⬆️"}
        {this.state.price == this.state.open && "⬜"}
        {this.state.price < this.state.open && "⬇️"}
        {` ${this.props.stock.ticker_symbol.toUpperCase()} - ${this.props.stock.total_shares} shares @ $${this.state.price.toFixed(2)}  = $${(this.props.stock.total_shares * this.state.price).toFixed(2)}`}
      </div>
    )
  }
}

export default PortfolioStockDisplay
