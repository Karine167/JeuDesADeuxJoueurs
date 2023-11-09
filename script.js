// Définition des fonctions d'affichage des scores
const afficheScoreTotal = (idtotal,total)=>{
  const pTot = document.getElementById(idtotal);
  pTot.textContent = total;
}
const afficheScoreTempo = (idtempo,tempo)=>{
  const pTot = document.getElementById(idtempo);
  pTot.textContent = tempo;
}
const afficheIndicatorMessage = (idIndic)=>{
  const indicator = document.getElementById(idIndic);
  indicator.textContent = "You have to play";
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
    if (nb==1){
      this.idtempo="tempo1";
      this.idtotal="total1";
      this.indicator="indicator1";
    } else {
      this.idtempo="tempo2";
      this.idtotal="total2";
      this.indicator="indicator2";
    }
  }
  afficheTotal(){
    afficheScoreTotal(this.idtotal,this.total);
  }
  afficheTempo(){
    afficheScoreTempo(this.idtempo,this.tempo);
  }
  afficheMessage(){
    afficheIndicatorMessage(this.indicator);
  }
  effaceMessage(){
    effaceIndicatorMessage(this.indicator);
  }
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
      player1.afficheMessage();
      player2.effaceMessage();
    }else{
      player2.afficheMessage();
      player1.effaceMessage();
    }
  //}
  
})


