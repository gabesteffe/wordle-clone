console.log("test")

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