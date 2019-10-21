import React, { Component } from 'react';

class Transaction extends Component {

  render() {
    const t = this.props.transaction
    return (
        <div className="stock-display stock_spacing">
          <a className="">
            {`${t.transactions_type} ${t.ticker_symbol}  -  ${t.shares} ${t.shares == 1 ? "share" : "shares"}`}
          </a>
          <a>{t.created_at}</a>
          <a className = "float_right">
            {`$${t.stock_price.toFixed(2)}`}
          </a>
        </div>
    )
  }
}

export default Transaction
