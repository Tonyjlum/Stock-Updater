import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

class Register extends Component {
  state = {
    email: "",
    password: "",
    name: ""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleLogin = () => {
    this.props.history.push("/")
  }

  handleSubmit = (e) => {
    e.preventDefault()
    fetch("http://localhost:3000/v1/register",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      })
    })
    .then( response => response.json())
    .then( account => {
      if (account.id > 0){
        this.props.history.push("/")
      } else {
        window.confirm(`That Email address is already in use. Please login with ${this.state.email} or try a different email.`)
      }
    })
  }

  render() {
    return (
      <div className="center">
        <form
          className= "login-form"
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}>
          <h2 className="center-text">Register a new Account</h2>
          <input
            className="form-input"
            id="name"
            placeholder="Name"
            value={this.state.name}
            required/>
          <br/>
          <input
            className="form-input"
            id="email"
            placeholder="Email"
            value={this.state.email}
            required/>
          <br/>
          <input
            className="form-input"
            type= "password"
            id="password"
            placeholder="password"
            value={this.state.password}
            required/>
          <br/>
          <input
            className="button"
            type="submit"
            value="Create New Account"/>
        </form>
        <button
          id="register-button"
          onClick={this.handleLogin}
        >Login</button>
      </div>
    )
  }
}

export default withRouter(Register)
