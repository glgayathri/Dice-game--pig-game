/*
YOUR 3 of 3 CHALLENGES
Change the game to follow these rules:
3. Add another dice to the game, so that there are two dices now.
The player looses his current score when one of them is a 1. 
(Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

let scores, roundScore, activePlayer, gamePlaying = true;

init();

let previousDice1, previousDice2;

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {

        //random number and display the respective dice
        let dice1 = Math.floor(Math.random() * 6) + 1;
        let dice2 = Math.floor(Math.random() * 6) + 1;

        document.querySelector('.dice1').style.display = 'block';
        document.querySelector('.dice1').src = 'dice-' + dice1 + '.png';
        
        document.querySelector('.dice2').style.display = 'block';
        document.querySelector('.dice2').src = 'dice-' + dice2 + '.png';

        //player looses the currentscore when rolled an '1'

        if (dice1 !== 1 && dice2 !== 1) { //Update score (roundScore) with the dice number rolled 
            roundScore += (dice1 + dice2);
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
        else if (previousDice1 === 6 && dice1 === 6 && dice2 === 6 && previousDice2 ===6)   //When the player has rolled '6' 2 times in a row the chance goes to the NEXT PLAYER and looses his GLOBAL SCORE
        {
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            console.log(scores[activePlayer]);
            pnextPlayer();
        }
        else {  //When rolled '1', it's the NEXT PLAYER or the player has rolled '6' 2 times in a row
            nextPlayer();
        }
        previousDice1 = dice1;
        previousDice2 = dice2;
        console.log(previousDice1, previousDice2);
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        scores[activePlayer] += roundScore;  //add the current score to the global score

        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];  //save and change the UI

        let input = document.querySelector('.winningScore').value;

        if (input){  // by default the type is coerced for 0, 'undefined' or null values
        winningScore = input;
        }else{
            winningScore = 50;
        }

        //check if the player won the game

        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';  //save and change the UI
            document.querySelector('.dice1').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();  //After a '1' is rolled, the scores get added to the global score and then goes to the NEXT player
        }

    }

});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');  // to change the DOM Interface as per the activePlayer
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
}

if(gamePlaying){
    document.querySelector('.btn-new').addEventListener('click',init);
}

function init () {
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.querySelector('.dice1').style.display='none';
    document.querySelector('.dice2').style.display='none';

    
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');  // removed and then added again because, if not removed before (after the game has finished), there will be 2 active states shown on DOM
}



