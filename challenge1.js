/*
YOUR 1 of 3 CHALLENGES
Change the game to follow these rules:
1. A player looses his ENTIRE score when he rolls two 6 in a row. 
After that, it's the next player's turn. 
(Hint: Always save the previous dice roll in a separate variable)
*/

let scores, roundScore, activePlayer, gamePlaying = true;

init();

let previousDice;

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {

        //random number
        let dice = Math.floor(Math.random() * 6) + 1;

        //display correct dice number as per random number generated
        document.querySelector('.dice').style.display = 'block';
        document.querySelector('.dice').src = 'dice-' + dice + '.png';

        //player looses the currentscore when rolled an '1'

        if (dice !== 1) { //Update score (roundScore) with the dice number rolled 
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
        else if (previousDice === 6 && dice === 6)   //When the player has rolled '6' 2 times in a row the chance goes to the NEXT PLAYER and looses his GLOBAL SCORE
        {
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            console.log(scores[activePlayer]);
            pnextPlayer();
        }
        else {  //When rolled '1', it's the NEXT PLAYER or the player has rolled '6' 2 times in a row
            nextPlayer();
        }
        previousDice = dice;
        console.log(previousDice);
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        scores[activePlayer] += roundScore;  //add the current score to the global score

        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];  //save and change the UI

        //check if the player won the game

        if (scores[activePlayer] >= 30) {
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';  //save and change the UI
            document.querySelector('.dice').style.display = 'none';
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

    document.querySelector('.dice').style.display = 'none';    
}

if(gamePlaying){
    document.querySelector('.btn-new').addEventListener('click',init);
}

function init () {
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display='none';
    
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



