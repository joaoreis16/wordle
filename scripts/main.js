var random_word

function add(letter) {
    for (let i = 0; i < 5; i++) {
        let space_for_letter = document.getElementById( ""+ (i+1) ).textContent;

        if (!space_for_letter) {
            console.log("atribuir à "+ (i+1) +"ª casa a letra "+ letter)
            document.getElementById( ""+ (i+1) ).innerHTML = letter
            break;
        }
    }
}

function remove() {
    for (let i = 5; i > 0; i--) {
        let space_for_letter = document.getElementById( ""+ i ).textContent;

        if (space_for_letter) {
            document.getElementById( ""+ i ).innerHTML = ""
            break;
        }
    }
}

function enter() {
    for (let i = 0; i < 5; i++) {
        let letter = document.getElementById( ""+ (i+1) ).textContent;

        if (random_word.includes(letter)) {
            console.log("contem a letra "+ letter)

            if (random_word[i] === letter) { // correct letter position
                document.getElementById( ""+ (i+1) ).style.backgroundColor = 'green';
                document.getElementById( ""+ (i+1) ).style.borderColor = 'green';

            } else {    // only correct letter, but the position is wrong
                document.getElementById( ""+ (i+1) ).style.backgroundColor = 'yellow';
                document.getElementById( ""+ (i+1) ).style.borderColor = 'yellow';
            }
        } 
    }
}

function generateRandomWord() {
    var file = 'words/ptWords_5.txt';
    var txtFile = new XMLHttpRequest();

    txtFile.open("GET", file, true);
    txtFile.onreadystatechange = function() {
        if (txtFile.readyState === 4) {  // document is ready to parse.
            if (txtFile.status === 200) {  // file is found
                allText = txtFile.responseText; 
                lines = txtFile.responseText.split("\n");

                var index = Math.floor(Math.random() * lines.length);
                random_word = lines[index]
                console.log(random_word)
            }
        }
    }
    txtFile.send(null);
}