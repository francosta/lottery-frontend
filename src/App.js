import React, { Component } from "react";
import "./App.css";
import web3 from "./web3";
import lottery from "./lottery";

export default class App extends Component {
  state = {
    manager: "",
    players: ""
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();

    this.setState({ manager });
  }

  render() {
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>This contract is managed by {this.state.manager}</p>
        <p>There are currently {this.state.players.length} in the lottery</p>
      </div>
    );
  }
}
