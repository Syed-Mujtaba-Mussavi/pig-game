'use strict';

// SELECTING ELEMENTS
const player0El=document.querySelector('.player--0');
const player1El=document.querySelector('.player--1');
const score0EL=document.querySelector('#score--0');
const score1EL=document.getElementById('score--1');
const current0El=document.getElementById('current--0');
const current1El=document.getElementById('current--1');
const diceEL=document.querySelector('.dice');
const btnNew=document.querySelector('.btn--new');
const btnRoll=document.querySelector('.btn--roll');
const btnHold=document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;
// Starting Conditions
const init=function(){
    currentScore=0;
    scores=[0,0];
    playing=true;
    activePlayer=0;

    score0EL.textContent=0;
    score1EL.textContent=0;
    current0El.textContent=0;
    current1El.textContent=0;
    diceEL.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}
init();


const switchPlayer=function(){
    document.getElementById(`current--${activePlayer}`).textContent=0;
    currentScore=0;
    activePlayer=activePlayer===0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};
// Rolling dice functionality
btnRoll.addEventListener('click',function(){
    if(playing){
    // 1. Generating a random dice roll
    const dice=Math.trunc(Math.random()*6)+1;

    // 2. Display dice
    diceEL.classList.remove('hidden');
    diceEL.src=`dice-${dice}.png`;
    // 3. Check for rolled 1
    if(dice !== 1){
    // Add dice to the current score 
        currentScore+=dice;
        document.getElementById(`current--${activePlayer}`).textContent=currentScore;
    }else{
        // switch to next player
        switchPlayer();
    }
}
});
btnHold.addEventListener('click',function(){
    if(playing){
    //1: add current score to active player's score
    scores[activePlayer]+=currentScore;
    document.getElementById(`score--${activePlayer}`).textContent=scores[activePlayer];
    //2: Check if player's score is >=100 
    if(scores[activePlayer]>=20){
        // Finish the game
        playing=false;
        alert(`Player ${activePlayer+1} is the winner`);
        diceEL.classList.add('hidden');
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    }else{
        // Switch to the next player
        switchPlayer();
    }
}
});
btnNew.addEventListener('click',init);