import React, { Component } from "react";
import "./App.css";
import web3 from "./web3";
import lottery from "./lottery";

export default class App extends Component {
  state = {
    manager: "",
    players: [],
    balance: ""
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.returnPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address); // In wei

    this.setState({ manager, players, balance });
  }

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
      </div>
    );
  }
}
