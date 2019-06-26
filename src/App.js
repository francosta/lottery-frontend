import React, { Component } from "react";
import "./App.css";
import web3 from "./web3";
import lottery from "./lottery";

export default class App extends Component {
  state = {
    manager: "",
    players: [],
    balance: "",
    value: "",
    message: ""
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.returnPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address); // In wei

    this.setState({ manager, players, balance });
  }

  onSubmit = async e => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: "Waiting on transaction success..." });

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, "ether")
    });

    this.setState({ message: "You have been entered to the lottery!" });
  };

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: "Waiting on transaction success." });

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    this.setState({ message: "A winner has been picked!" });
  };

  render() {
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>This contract is managed by {this.state.manager}</p>
        <p>
          There are currently {this.state.players.length} players in the
          lottery.
        </p>
        <p>
          {" "}
          Currently, the lottery has{" "}
          {web3.utils.fromWei(this.state.balance, "ether")} ether.
        </p>

        <hr />

        <form onSubmit={e => this.onSubmit(e)}>
          <h4>Want to try your luck?</h4>
          <div>
            <label>Amount of ether to enter </label>
            <input
              placeholder="0"
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Enter</button>
        </form>
        <hr />

        <h4>Ready to pick a winner?</h4>
        <button onClick={this.onClick}>Pick a winner</button>
        <hr />
        <h3>{this.state.message}</h3>
      </div>
    );
  }
}
