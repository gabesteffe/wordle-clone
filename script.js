/*
TODO:
    - update CSS to make UI look cleaner
        - adjust size, spacing and borders of letter tiles (possibly round off the corners?)
        - adjust the placement and padding of the button and text field
        - consider making the letters appear within the current row
    - add functionality so that users can append / remove letters from their current guess with the keyboard, as well as submit a guess
    - play an animation when the player wins
    - generate the secret word randomly
    - give the option to play again once the game is over
    - keep track of statistics across games
    - implement customizable word lengths

*/

let secretWord = "snore"

let submitBtn = document.getElementById("submitBtn")
let guessText = document.getElementById("guessText")
let container = document.getElementsByClassName("container")[0]
let keyboardContainer = document.getElementsByClassName("keyboardContainer")[0]
let divs = []
let guessCounter = 0
const guessLimit = 5

function main(){
    populateDivs();
    populateKeyboard();
    submitBtn.onclick = attemptGuess
}

function attemptGuess(){
    /*
    - validate the guess
    - evaluate the guess
        - determine which letters in the guess are in the solution and if the positions are yellow or green
        - handle the win condition
        - handle the loss condition
    - update the row to reflect guess evaluation
    - update the keybord to reflect guess evaluation
    - increment guess counter
    */
    let guess = guessText.value
    if (!isGuessValid(guess)){
        console.log(`That guess was not valid, please submit a guess with ${secretWord.length} characters`)
    }

    let results = evaluateGuess(guess)

    let lettersNotInWord = []
    for (let i = 0 ; i < guess.length ; i++){
        if (results[i] === "-"){
            lettersNotInWord.push(guess[i])
        }
    }

    updateRow(guess, results)
    updateKeyboard(lettersNotInWord)

    //check for win condition and for loss condition
    evaluateGameState(results)
    guessCounter++

}

function isGuessValid(guess){
    return (guess.length === secretWord.length ? true : false)
}

function populateDivs(){
    for (var i = 0; i < 6; i++){
        const rowDiv = document.createElement("div")
        rowDiv.classList.add("row")
        container.appendChild(rowDiv)
        for (var j = 0; j < 5; j++){
            const div = document.createElement("div")
            div.classList.add("letterBox")
            rowDiv.appendChild(div)
        }
        divs.push(rowDiv)
    }
}

function populateKeyboard(){
    for (var i = 0; i < 26; i++){
        const letterKey = document.createElement("div")
        letter = String.fromCharCode(97 + i);
        letterKey.innerText = letter
        letterKey.classList.add("keyboardKey")
        letterKey.onclick = (event) => {
            guessText.value = guessText.value + event.target.innerText
        }
        keyboardContainer.appendChild(letterKey)
    }
}

/*
    returns an array made up of three possible characters, "G" for a green letter, "Y" for a yellow letter and "-" for a letter
    that doesn't appear in the guess
*/
function evaluateGuess(guess){
    let results = []
    for (var i = 0 ; i < guess.length; i++){
        results.push(evaluateLetter(guess, i))
    }
    
    return results
}

function evaluateLetter(word, letterIndex){
    letter = word[letterIndex]
    let greenFlag = false
    let yellowFlag = false
    //iterate through all letters in the secret word to see if the letter from the guess is there
    for (var i = 0; i < secretWord.length; i++){
        if (secretWord[i] === letter){
            letterIndex === i ? greenFlag = true : yellowFlag = true;
        } 
    }
    if (greenFlag){
        return "G"
    } else if (yellowFlag){
        return "Y"
    }
    else{
        return "-"
    }
}

function evaluateGameState(guessResults){
    let winningGuess = true;
    for (char of guessResults){
        if (char !== "G"){
            winningGuess = false
            break
        }
    }
    if (winningGuess){
        revokeSubmitBtnFunctionality()
        playWinAnimation()
        console.log("congrats, you won!")
    } else {
        if (guessCounter === guessLimit){
            console.log("Oh no, you lost! better luck next time!")
            revokeSubmitBtnFunctionality()
        }
    }
}

function updateKeyboard(letters){
    for (letter of letters){
        //use the ascii code from the letter to determine its index
        let index = letter.toLowerCase().charCodeAt(0) - 97
        //black out that div
        keyboardContainer.children[index].classList.add("outsideOfSolution")
    }
}

function updateRow(guessWord, results){
    for (i = 0; i < guessWord.length ; i++){
        let letterTile = divs[guessCounter].children[i]
        letterTile.innerText = guessWord[i]
        if (results[i] === 'G'){
            letterTile.classList.add('greenLetterBox')
        } else if (results[i] === 'Y'){
            letterTile.classList.add('yellowLetterBox')
        }
    }
}

function playWinAnimation(){
    for (tile of divs[guessCounter].children){
        tile.classList.add("winningDiv")
    }
}

function revokeSubmitBtnFunctionality(){
    submitBtn.onclick = () => {}
}

main()