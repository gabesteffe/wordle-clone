let secretWord = "apple"

let container = document.getElementsByClassName("container")[0]
let divs = []
let i = 0
while (i < 6){ 
    const rowDiv = document.createElement("div" + i)
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
    i++
}

function guessWord(guess){
    let results = []
    for (var i = 0 ; i < guess.length; i++){
        results.push(letterAppearsInSecretWord(guess, i))
    }
    console.log(results)
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

