import React from 'react';

import React from 'react';

class App extends React.Component{
    constructor(){
        super();
        this.state = {
          playerArr:[""],
          winnerArr:["dani"],
          player1: "",
          player2: "",
          value:""
        }
    }

getPlayer =()=>{
      let arr = this.state.playerArr;
      let player = arr.pop();
      this.setState({playerArr:arr});
      return player;
    }

getPlayers=()=>{
  let popPlayer1 =  this.getPlayer()
  let popPlayer2 =  this.getPlayer()
  this.setState({
    player1: popPlayer1,
    player2: popPlayer2
  })
  }

  handleChange=(event)=>{
    this.setState({value: event.target.value})
  }

  handleSubmit=(event)=>{
    this.setState({playerArr: [...this.state.playerArr, this.state.value], value:""})
    event.preventDefault();
  }

  playGame=()=>{
    this.getPlayers();
  }

  render(){

    return(
      <div>
      <div>
        {this.state.player1} VS {this.state.player2}
      </div>
      <div>
        <form onSubmit={this.handleSubmit}>
            <input placeholder="Your name here" value={this.state.value} onChange={this.handleChange}/>
            <input type="submit" value="Add Player" />
        </form>
        <button onClick={this.playGame}>Play Game</button>
      </div>
      </div>
     )
  }
}

export default App;
