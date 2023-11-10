// DOM elements
const rollDice = document.getElementById('rollDice');
const hold = document.getElementById('hold');
const newGame = document.getElementById('newGame');
const de = document.getElementById('de');
const indicator1 = document.getElementById('indicator1');
const indicator2 = document.getElementById('indicator2');
const total1 = document.getElementById('total1');
const total2 = document.getElementById('total2');
const tempo1 = document.getElementById('tempo1');
const tempo2 = document.getElementById('tempo2');
// Dice Show
const afficheDe = (result)=>{
  de.textContent = result;
}

// Class Player
class Player{
  constructor (nb,play){
    this.tempo = 0; // initial current sold 
    this.total = 0; // initial total game
    this.mustPlay = play; //boolean
    if (nb==1){
      this.idtempo=tempo1;
      this.idtotal=total1;
      this.indicator=indicator1;
    }else {
      this.idtempo=tempo2;
      this.idtotal=total2;
      this.indicator=indicator2;
    }
  }
  afficheTotal(){
    this.idtotal.textContent= this.total;
  }
  afficheTempo(){
    this.idtempo.textContent = this.tempo;
  }
  afficheMessage(message){
    this.indicator.textContent = message;
  }
  effaceMessage(){
    this.indicator.textContent = "O";
  }
}
// Init game
let player1 = new Player(1,true);
let player2 = new Player(2,false);
let playergame = player1;
let resultDe = new Number();

//Intit tempo
const initialTempo = ()=>{
  player1.tempo = 0;
  player1.afficheTempo();
  player2.tempo = 0;
  player2.afficheTempo();
  playergame.tempo = 0;
}

//Intit total
const initialTotal = ()=>{
  player1.total = 0;
  player1.afficheTotal();
  player2.total = 0;
  player2.afficheTotal();
}

// change player
const changePlayer = ()=>{
  if (playergame === player1) {
    playergame = player2;
  }else{
    playergame = player1;
  }
}
// Création d'une fonction pour gérer un tour de jeu
const gameTour = (playergame)=>{
    rollDice.addEventListener('click', ()=>{
      resultDe = Math.floor(Math.random() * 6)+1;
      afficheDe(resultDe);
      if (resultDe === 1) {
        changePlayer();
        initialTempo();
        affichePlayer(playergame);
      }else{
        playergame.tempo += resultDe;
        resultDe = 0;
        playergame.afficheTempo();
      }
    });
    hold.addEventListener('click', ()=>{
      playergame.total += playergame.tempo;
      playergame.afficheTotal();
      initialTempo();
      changePlayer();
      afficheWinner(playergame);
    });
} 
// begin new game
newGame.addEventListener('click', ()=>{
  // Init game
  initialTempo();
  initialTotal();
  affichePlayer(player1);
});

//show who play
const affichePlayer = (playergame) => {
  if (playergame === player1){
    player1.afficheMessage("You have to play");
    player2.effaceMessage();
    gameTour(player1);
  }else{
    player2.afficheMessage("You have to play");
    player1.effaceMessage();
    gameTour(player2);
  }
}
//show who win
const afficheWinner = (playergame) => {
  if (player1.total>=100){
    player1.afficheMessage("You Won !! Congratulations !");
    player2.afficheMessage("You lose !! Sorry !");
  }else{
    if (player2.total>=100){
    player2.afficheMessage("You Won !! Congratulations !");
    player1.afficheMessage("You lose !! Sorry !");
    }
  }
  affichePlayer(playergame); 
};