// Définition des fonctions d'affichage des scores
const afficheScoreTotal = (idtotal,total)=>{
  const pTot = document.getElementById(idtotal);
  pTot.textContent = total;
}
const afficheScoreTempo = (idtempo,tempo)=>{
  const pTot = document.getElementById(idtempo);
  pTot.textContent = tempo;
}
// Définition des fonctions d'affichage des messages
const afficheIndicatorMessage = (idIndic, message)=>{
  const indicator = document.getElementById(idIndic);
  indicator.textContent = message;
}
const effaceIndicatorMessage = (idIndic)=>{
  const indicator = document.getElementById(idIndic);
  indicator.textContent = "O";
}
// Classe Joueur
class Player{
  constructor (nb,play){
    this.tempo = 0; // initial current sold 
    this.total = 0; // initial total game
    this.mustPlay = play; //boolean
    this.idtempo=`tempo${nb}`;
    this.idtotal=`total${nb}`;
    this.indicator=`indicator${nb}`;
  }
  afficheTotal(){
    afficheScoreTotal(this.idtotal,this.total);
  }
  afficheTempo(){
    afficheScoreTempo(this.idtempo,this.tempo);
  }
  afficheMessage(message){
    afficheIndicatorMessage(this.indicator, message);
  }
  effaceMessage(){
    effaceIndicatorMessage(this.indicator);
  }
}
// Création d'une fonction pour gérer un tour de jeu
const gameTour = (playergame, otherplayer)=>{
  const rollDice = document.getElementById('rollDice');
  const hold = document.getElementById('hold');
    rollDice.addEventListener('click', ()=>{
      let resultDe = Math.floor(Math.random() * 6)+1;
      const de = document.getElementById('de');
      de.textContent = resultDe;
      if (resultDe == 1) {
        playergame.tempo = 0;
        playergame.afficheTempo();
        playergame.mustPlay = false;
        otherplayer.mustPlay = true;
        rollDice.removeEventListener('click');
        otherplayer.afficheMessage("You have to play");
        playergame.effaceMessage();
        gameTour(otherplayer,playergame);
      }else{
        playergame.tempo += resultDe;
        playergame.afficheTempo();
      }
    });
    hold.addEventListener('click', ()=>{
      playergame.total += playergame.tempo;
      playergame.tempo = 0;
      playergame.afficheTempo();
      playergame.afficheTotal();
      playergame.mustPlay = false;
      otherplayer.mustPlay = true;
      hold.removeEventListener('click');
      otherplayer.afficheMessage("You have to play");
      playergame.effaceMessage();
      gameTour(otherplayer,playergame);
    });
} 
// création d'un écouteur d'événement sur le bouton newgame
const newGame = document.getElementById('newGame');
newGame.addEventListener('click', ()=>{
  // Initialisation du jeu
  let player1 = new Player(1,true);
  player1.afficheTotal();
  player1.afficheTempo();
  let player2 = new Player(2,false);
  player2.afficheTotal();
  player2.afficheTempo();
  //while (player1.total<100 && player2.total<100){
    if (player1.mustPlay){
      player1.afficheMessage("You have to play");
      player2.effaceMessage();
      gameTour(player1,player2);
    }else{
      player2.afficheMessage("You have to play");
      player1.effaceMessage();
      gameTour(player2,player1)
    }
  //}
  /* if (player1.total>=100){
    player1.afficheMessage('You Won !! Congratualtions !');
    player2.afficheMessage('You lose !! Sorry !');
  }else{
    player2.afficheMessage('You Won !! Congratualtions !');
    player1.afficheMessage('You lose !! Sorry !');
  }  */
});


