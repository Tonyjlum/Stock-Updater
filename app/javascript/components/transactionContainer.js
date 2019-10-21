import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom'
import Transaction from './transaction'
import NavBar from './navbar'

class TransactionContainer extends PureComponent {
  state = {
    transactions: []
  }

  componentDidMount(){
    fetch(`http://localhost:3000/v1/users/${this.props.user.id}`)
    .then(resp => resp.json())
    .then( resp => {
      this.setState({transactions: resp.user.transactions})
    })
  }

  renderTransactions= () => {
    return this.state.transactions.map( transaction => {
      return <Transaction key={transaction.id} transaction={transaction}/>
    })
  }

  render() {
    if (this.props.user.id === 0) { this.props.history.push("/") }
    return (
      <div className="standard-size">
      <NavBar/>
        <h1>Transaction</h1>

        <div className="overflow">
          {this.renderTransactions()}
        </div>
      </div>
    )
  }
}

export default withRouter(TransactionContainer)
