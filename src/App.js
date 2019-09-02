import React from 'react';
import './App.css';

const Winner = (props) => (
  <div className="winner-section">
    <img src="https://image.flaticon.com/icons/png/512/321/321773.png" width="50" height="50"  />
    Winner: {props.winnerName}
  </div>
)

class App extends React.Component{
  constructor(){
      super();
      this.state = {
        // each match inside matches, contains player1, player2 and a flag called played indicading if that match was played or not
        matches: [],
        player1: '', // will hold the value inside the input of player1
        player2: '', // will hold the value inside the input of player2
        previousWinner: null // The initial state is Null, kind of like "0" or "false". It will hold the value of the winner of the previous match
      }
  }

  handleChangePlayer1=(event)=>{
    // called when the input of player1 is changed
    this.setState({ player1: event.target.value })
  }

  handleChangePlayer2=(event)=>{
    // called when the input of player2 is changed
    this.setState({ player2: event.target.value })
  }

  onAddGame=(event)=>{
    // called when the form containing inputs for player1 and player2 is submitted
    this.addMatch(this.state.player1, this.state.player2)
    this.setState({ player1: '', player2: '' }) // resets player1 and player2 to empty string
    event.preventDefault(); // prevents the form submission from causing a page reload
  }

  // receives 2 players as parameters
  addMatch = (player1, player2) => {
    const newMatch = {
      player1: player1,
      player2: player2,
      played: false
    }
    const newMatches = this.state.matches.concat(newMatch)
    this.setState({ matches: newMatches })
  }

  markMatchAsPlayed = (playedMatch) => {
    // iterate over the matches to find what match is the played one
    // once it finds it, it sets its played attribute to true and return
    this.state.matches.map(match => {
      if(match !== playedMatch) {
        // if the match we are iterating on is not equal to playedMatch
        // we simply return it, as it's not the match we're looking for
        return match
      } else {
        // if it reaches here, it means the current match is the one we're looking for
        // so we set its played attribute to true and return it
        playedMatch.played = true
        return playedMatch
      }
    })
  }

  // play receives the match being played and its winner
  play = (match, newWinner) => {
    // if there's no previous winner we set it to be the newWinner
    if(this.state.previousWinner === null) {
      this.setState({ previousWinner: newWinner })
    } else {
      // if there's a previous winner already, we simply create a new match
      // passing the previousWinner and the newWinner
      this.addMatch(this.state.previousWinner, newWinner)
      // since we created a new match, we need to "forget" what the previousWinner was by setting it to null
      this.setState({ previousWinner: null })
    }

    // finally, we need to mark the current match as played
    this.markMatchAsPlayed(match)
  }

  render(){
    return(
      <div>
        <form onSubmit={this.onAddGame}>
            <input className="player-input" placeholder="Player 1" onChange={this.handleChangePlayer1} value={this.state.player1} />
            <input className="player-input" placeholder="Player 2" onChange={this.handleChangePlayer2} value={this.state.player2} />
            <input className="player-input" type="submit" value="Add Match" />
        </form>
        <ol>
          {this.state.matches.map(match => (
            <li key={match.player1+match.player2}>
              <span>
                {match.player1}
                <button
                  disabled={match.played === true}
                  onClick={() => this.play(match, match.player1)}>Win!</button>
              </span>
              <span>   VS   </span>
              <span>{match.player2} <button disabled={match.played === true} onClick={() => this.play(match, match.player2)}>Win!</button></span>
            </li>
          ))}
        </ol>

        <Winner winnerName={this.state.previousWinner} />
      </div>
     )
  }
}

export default App;
