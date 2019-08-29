import React from 'react';

class App extends React.Component{
    constructor(){
        super();
        this.state = {
          playerArr:['Herc','Daniel','Megan','Vanessa','Kat','Jordan','Ben','Corey','Darnel','Greg','Mike','Ange'],
          winnerArr:['Ben','Jordan'],

        }
    }

    getPlayer =()=>{
      let arr = this.state.playerArr;
      let player = arr.pop();
      this.setState({playerArr:arr});
      console.log(arr);
      return player;
    }

componentDidMount(){
let popPlayer =  this.getPlayer()
  console.log(popPlayer);

}

    render(){
      // put js herege


        return(
            <div>
              {this.state.playerArr}
            </div>

        )
    }
}



export default App;
