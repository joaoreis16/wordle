function initBoard() {
    let board = document.getElementById("game-board");

    /* for (let i = 0; i < NUMBER_OF_GUESSES; i++) { */
    for (let i = 0; i < 5; i++) {
        let row = document.createElement("div")
        row.className = "letter-row"
        
        for (let j = 0; j < 5; j++) {
            let box = document.createElement("div")
            box.className = "letter-box"
            row.appendChild(box)
        }

        board.appendChild(row)
    }
}

initBoard()