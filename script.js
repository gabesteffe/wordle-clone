let secretWord = "snore"

let submitBtn = document.getElementById("submitBtn")
let guessText = document.getElementById("guessText")
let container = document.getElementsByClassName("container")[0]
let divs = []
let guessCounter = 0

function main(){
    populateDivs();
    submitBtn.onclick = () => {
        guess = guessText.value
        if (validateGuess(guess)){
            let results = guessWord(guess)
            updateRow(guess, results)
            guessCounter++
        } else {
            console.log(`That guess was not valid, please submit a guess with ${secretWord.length} characters`)
        }
    }
}

function validateGuess(guess){
    return (guess.length === secretWord.length ? true : false)
}

function populateDivs(){
    let i = 0
    while (i < 6){ 
        const rowDiv = document.createElement("div")
        rowDiv.classList.add("row")
        container.appendChild(rowDiv)
        let j = 0
        while (j < 5){
            const div = document.createElement("div")
            div.classList.add("letterBox")
            div.innerText = "div"
            rowDiv.appendChild(div)
            j++
        }
        divs.push(rowDiv)
        i++
    }
}

function guessWord(guess){
    let results = []
    for (var i = 0 ; i < guess.length; i++){
        results.push(letterAppearsInSecretWord(guess, i))
    }
    return results
}

function letterAppearsInSecretWord(word, letterIndex){
    letter = word[letterIndex]
    let letterFound = false
    let greenFlag = false
    let yellowFlag = false
    //iterate through all letters in the secret word to see if the letter from the guess is there
    for (var i = 0; i < secretWord.length; i++){
        if (secretWord[i] === letter){
            if (letterIndex === i){
                greenFlag = true
                console.log("the " + letter + " character at position " + (i+1) + " is correct")
            } else {
                yellowFlag = true
                console.log("the " + letter + " character is in the secret word, but not at position " + (i+1))
            }
        } 
    }
    if (greenFlag){
        return "G"
    } else if (yellowFlag){
        return "Y"
    }
    else{
        return "-"
        console.log("the " + letter + " character is in not the secret word")
    }
}

function updateRow(guessWord, results){
    for (i = 0; i < guessWord.length ; i++){
        let letterTile = divs[guessCounter].children[i]
        letterTile.innerText = guess[i]
        if (results[i] === 'G'){
            letterTile.style.color = 'Green'
        } else if (results[i] === 'Y'){
            letterTile.style.color = 'Yellow'
        }
    }
}

main()