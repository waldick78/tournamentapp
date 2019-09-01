import React from 'react';

class App extends React.Component{
    constructor(){
        super();
        this.state = {
          matches: [
            { player1: "player1", player2: "player2", played: false },
            { player1: "player3", player2: "player4", played: false },
          ],
          player1: '',
          player2: '',
          value:"",
          winner1: null
        }
    }

  handleChangePlayer1=(event)=>{
    this.setState({player1: event.target.value})
  }

  handleChangePlayer2=(event)=>{
    this.setState({player2: event.target.value})
  }

  addGame=(event)=>{
    // this.setState({playerArr: [...this.state.playerArr, this.state.value], value:""})
    this.setState({
      matches: [
        ...this.state.matches,
        { player1: this.state.player1, player2: this.state.player2, played: false }
      ],
      player1: '',
      player2: ''
    })

    event.preventDefault();
  }

  addMatch = (player1, player2) => {
    this.setState({
      matches: [
        ...this.state.matches,
        { player1, player2, played: false }
      ]
    })
  }

  winner = (player) => {
    if(this.state.winner1 === null) {
      this.setState({ winner1: player })
    } else {
      this.addMatch(this.state.winner1, player)
      this.setState({ winner1: null })
    }
  }

  render(){
    return(
      <div>
          <form onSubmit={this.addGame}>
              <input placeholder="Player 1" onChange={this.handleChangePlayer1} value={this.state.player1} />
              <input placeholder="Player 2" onChange={this.handleChangePlayer2} value={this.state.player2} />
              <input type="submit" value="Add Match" />
          </form>
          <ol>
            {this.state.matches.map(match => (
              <li key={match.player1+match.player2}>
                {match.player1} <button disabled={match.played === true} onClick={() => this.winner(match.player1) }>Winner!</button>
                VS
                {match.player2} <button onClick={() => this.winner(match.player2) }>Winner!</button>
              </li>
            ))}
          </ol>
          <div>
            Winner: {this.state.winner1}
          </div>
      </div>
     )
  }
}

export default App;
