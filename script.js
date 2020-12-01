//selecting elements from document - let, var works almost same way. We use const to declare a variable which will be constant throughout the project, for selecting elements we can use var or let or const but const is recommended since these value will be constant throughout the project
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
var score0 = document.querySelector("#score--0");
let score1 = document.getElementById("score--1"); //to select using getElementById() where Id is associated with the element, we don't need to use "#" before the id name. getElementById() is used to select elements which has "id" asociated with it.
let currentScore0 = document.getElementById("current--0");
let currentScore1 = document.getElementById("current--1");
const diceImage = document.querySelector(".dice");
var btnRollDice = document.querySelector(".btn--roll");
var btnNewGame = document.querySelector(".btn--new");
var btnHold = document.querySelector(".btn--hold");

var activePlayer, currentScore, score, isFinished;

//this is to initialize all the variables and contents when the game is loaded for the 1st time or the New Game button ispressed
function initialization()
{
    activePlayer = 0;
    currentScore = 0;
    score = [0, 0];
    isFinished = false;

    // score for both the players will be 0 and dice image will be hidden when the game is loaded initially
    currentScore0.textContent = currentScore;
    currentScore1.textContent = currentScore;
    score0.textContent = currentScore;
    score1.textContent = currentScore;

    diceImage.classList.add("hidden"); //this is to hide the dice image when dice is not rolled

    //to remove css class "player--winner" from winner player if the New Game button is pressed after finishing a game
    player0.classList.remove("player--winner");
    player1.classList.remove("player--winner");

    player0.classList.add("player--active"); //to set player0 as active player initially 
    player1.classList.remove("player--active"); //to remove css class "player--active" from player1 if that's present with player1
}

initialization(); //this function will be called 2 times - when the game is loaded from the 1st time to initialize all the variables or, the New Game button is pressed

//function to switch to next player
function switchToNextPlayer()
{
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore; //before switching to next player, resetting the current score of current active player to 0
    activePlayer = activePlayer === 0 ? 1 : 0;
    //toggle() will add the css class to the element if it's not present else will remove the css class from the element
    player0.classList.toggle("player--active");
    player1.classList.toggle("player--active");
}

//Rolling dice functionality
function clickHandlerForDiceRolling()
{
    if(!isFinished) //button functionality will work if the game is not finished
    {
        //1. Generate a random dice roll
        var dice = Math.trunc((Math.random() * 6)) + 1; //will generate number between 1 to 6

        //2. Display the dice image depending on the dice roll
        diceImage.classList.remove("hidden"); //to do manipulation of element's css class content attribute, we don't need to mention "." before class name or "#" before id.
        diceImage.src = `./img/dice-${dice}.png`; //to display the correct dice image as per the random dice value

        //3. Add the dice's value to current score if the dice's value is > 1
        if(dice > 1)
        {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore; //this is to dynamically select the current score element and change the score        
        }
        //else switch to the next player
        else
        {
            switchToNextPlayer();        
        }
    }    
}

//Hold button's functionality
function clickHandlerForHold()
{
    //button functionality will work if the game is not finished
    if(!isFinished)
    {
        //1. add current score to score of active player
        score[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];

        //2. if score of active player is >= 100 then finish the game
        if(score[activePlayer] >= 100)
        {
            isFinished = true; //finishing the game
            diceImage.classList.add("hidden"); //hiding the dice image as it was initially
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner"); //adding the css class "player--winner" to the winner
            document.querySelector(`.player--${activePlayer}`).classList.add("player--active"); //removing the css class "player--active" after adding "player--winner" as both will create a mix of background color for the winner player
        }
        else    
            switchToNextPlayer(); //switch to next player
    }    
}

//attaching events and eventHandlers to buttons - Roll Dice, Hold, New Game
btnRollDice.addEventListener("click", clickHandlerForDiceRolling);
btnHold.addEventListener("click", clickHandlerForHold);
btnNewGame.addEventListener("click", initialization);