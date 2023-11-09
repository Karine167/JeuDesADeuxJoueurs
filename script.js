// Classe Joueur
class Player{
  constructor (nb,play){
    this.tempo = 0; // initial current sold 
    this.total = 0; // initial total game
    this.mustPlay = play; //boolean
    if (nb==1){
      this.idtempo="tempo1"
      this.idtotal="total1"
    } else {
      this.idtempo="tempo2"
      this.idtotal="total2"
    }
  }
}

let player1 = new Player(1,true);
let player2 = new Player(2,false);
console.log (player1, player2);