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
let resultDe = new Number();
let gameIn = false;

//Intit tempo
const initialTempo = ()=>{
  player1.tempo = 0;
  player1.afficheTempo();
  player2.tempo = 0;
  player2.afficheTempo();
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
  if (player1.mustPlay) {
    player1.mustPlay = false;
    player2.mustPlay = true;
  }else{
    player2.mustPlay = false;
    player1.mustPlay = true;
  }
}
// Création d'une fonction pour gérer un tour de jeu
const gameTour = ()=>{
    rollDice.addEventListener('click', ()=>{
      resultDe = Math.floor(Math.random() * 6)+1;
      afficheDe(resultDe);
      if (resultDe === 1) {
        changePlayer();
        initialTempo();
        affichePlayer();
      }else{
        if (gameIn){
          if (player1.mustPlay){
            console.log(player1.tempo, resultDe)
            player1.tempo = player1.tempo + resultDe;
            console.log(player1.tempo);
            player1.afficheTempo();
          }else{
            player2.tempo = player2.tempo + resultDe;
            player2.afficheTempo();
          }
        }
      }
    });
    hold.addEventListener('click', ()=>{
      if (gameIn){
        if (player1.mustPlay){
          player1.total = player1.total + player1.tempo;
          player1.afficheTotal();
        } else {
          player2.total = player2.total + player2.tempo;
          player2.afficheTotal();
        }
        initialTempo();
        changePlayer();
        afficheWinner();
      }
    });
} 
// begin new game
newGame.addEventListener('click', ()=>{
  if (!gameIn){
    // Init game
    initialTempo();
    initialTotal();
    affichePlayer();
    gameIn = true;
  }
});

//show who play
const affichePlayer = () => {
  if (player1.mustPlay){
    player1.afficheMessage("You have to play");
    player2.effaceMessage();
  }else{
    player2.afficheMessage("You have to play");
    player1.effaceMessage();
  }
}
//show who win
const afficheWinner = () => {
  if (player1.total>=100){
    player1.afficheMessage("You Won !! Congratulations !");
    player2.afficheMessage("You lose !! Sorry !");
    gameIn = false;
  }else{
    if (player2.total>=100){
    player2.afficheMessage("You Won !! Congratulations !");
    player1.afficheMessage("You lose !! Sorry !");
    gameIn = false;
    } else {
      affichePlayer();
    }
  }  
};
gameTour();