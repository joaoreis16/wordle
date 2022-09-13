var RANDOM_WORD = ""
var TOTAL_GUESSES = 5
var NUM_GUESS = 1
var CURRENT_GUESS = ""
var ALL_WORDS = []


function add(letter) {
    for (let i = 0; i < 5; i++) {
        var letterID = NUM_GUESS +"x"+ (i+1)
        let space_for_letter = document.getElementById( letterID ).textContent;

        if (!space_for_letter) {
            document.getElementById( letterID ).innerHTML = letter
            CURRENT_GUESS += letter
            break;
        }
    }
}


function remove() {
    for (let i = 5; i > 0; i--) {
        var letterID = NUM_GUESS +"x"+ i
        let space_for_letter = document.getElementById( letterID ).textContent;

        if (space_for_letter) {
            document.getElementById( letterID ).innerHTML = ""
            CURRENT_GUESS = CURRENT_GUESS.slice(0, -1);
            break;
        }
    }
}


function enter() {
    if (CURRENT_GUESS.length != 5) return

    if (!isWord(CURRENT_GUESS)) {
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        return
    }


    for (let i = 0; i < 5; i++) {
        var letterID = NUM_GUESS +"x"+ (i+1)
        let letter = document.getElementById( letterID ).textContent;

        if (RANDOM_WORD.includes(letter)) {
            if (RANDOM_WORD[i] === letter) { // correct letter position
                document.getElementById( letterID ).style.backgroundColor = '#93C572';
                document.getElementById( letterID ).style.borderColor = '#2E8B57';

                document.getElementById( letter ).style.backgroundColor = '#2E8B57';

            } else {    // only correct letter, but the position is wrong
                document.getElementById( letterID ).style.backgroundColor = '#FCF55F';
                document.getElementById( letterID ).style.borderColor = '#FFD700';

                document.getElementById( letter ).style.backgroundColor = '#FFD700';
            }

        } else {
            document.getElementById( letterID ).style.backgroundColor = 'lightgray';
            document.getElementById( letterID ).style.borderColor = 'grey';

            document.getElementById( letter ).style.backgroundColor = 'gray';
        }
    }

    if (CURRENT_GUESS.toLowerCase() === RANDOM_WORD.toLowerCase()) {
        document.getElementById("exampleModalLongTitle").innerHTML = "Congratulations!"
        document.getElementById("correctWord").innerHTML = ""
        document.getElementById("wordFound").click();
        return
    }


    CURRENT_GUESS = ""
    NUM_GUESS += 1

    if (NUM_GUESS == TOTAL_GUESSES + 1) {
        document.getElementById("exampleModalLongTitle").innerHTML = "You lose..."
        document.getElementById("correctWord").innerHTML = "The correct word is " + RANDOM_WORD
        document.getElementById("wordFound").click();
    }
}


function generateRandomWord(num_letters) {
    var file = 'words/ptWords_'+ num_letters +'.txt';
    var txtFile = new XMLHttpRequest();


    txtFile.open("GET", file, true);
    txtFile.onreadystatechange = function() {
        if (txtFile.readyState === 4) {  // document is ready to parse.
            if (txtFile.status === 200) {  // file is found
                allText = txtFile.responseText; 
                lines = txtFile.responseText.split("\n");

                var index = Math.floor(Math.random() * lines.length);
                RANDOM_WORD = lines[index]
                console.log(RANDOM_WORD)

                ALL_WORDS = lines
            }
        }
    }
    txtFile.send(null);
}


// [fonte] https://www.freecodecamp.org/news/build-a-wordle-clone-in-javascript/ 
function initBoard() {
    let board = document.getElementById("game-board");

    var num_letters = 5

    for (let i = 0; i < TOTAL_GUESSES; i++) {
        let row = document.createElement("div")
        row.className = "letter-row"
        
        for (let j = 0; j < num_letters; j++) {
            let box = document.createElement("div")
            box.className = "letter"
            box.id = (i+1) +"x"+ (j+1)
            row.appendChild(box)
        }

        board.appendChild(row)
    }

    generateRandomWord(num_letters)
}


function resetGame() {
    generateRandomWord(5)
    TOTAL_GUESSES = 5
    NUM_GUESS = 1
    CURRENT_GUESS = ""

    elements = document.getElementsByClassName("keyboard-button");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = "#f5f5f5";
        document.getElementById("ENTER").style.backgroundColor = '#A7C7E7';
        document.getElementById("DEL").style.backgroundColor = '#C0C0C0';
    }

    for (let i = 0; i < TOTAL_GUESSES; i++) {
        for (let j = 0; j < 5; j++) {
            var letterID = (i+1) +"x"+ (j+1)
            document.getElementById( letterID ).innerHTML = ""
            document.getElementById( letterID ).style.backgroundColor = "#f5f5f5"
            document.getElementById( letterID ).style.borderColor = 'grey';
        }
    }
}

function isWord(word) {
    if (ALL_WORDS.includes(word)) return true;
    return false;
}