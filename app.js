let numberOfRow = parseInt(prompt("Nombre d'images par ligne et colones (nombre pair de 2 a 10) ?"));
let container = document.getElementById("container");
let firstChoice,
    secondChoice = null;

if (numberOfRow % 2 != 0) {
    numberOfRow--;
}

if (!numberOfRow) {
    numberOfRow = 4;
}

if (numberOfRow < 2) {
    numberOfRow = 2;
}

if (numberOfRow > 10) {
    numberOfRow = 10;
}

let numberOfPairsRemaining = (numberOfRow*numberOfRow)/2;
let ImageArray = [];
//! Creer le nombre 
for (let i = 1; i < numberOfPairsRemaining+1; i++) {
    ImageArray.push(i)
    ImageArray.push(i)
}
ImageArray = ImageArray.sort((a, b) => 0.5 - Math.random());
Index = 0;

container.style.gridTemplateColumns = `repeat(${numberOfRow}, 1fr)`;
container.style.gridTemplateRows = `repeat(${numberOfRow}, 1fr)`;

//! On remplis la grille
for (let x = 1; x < numberOfRow + 1; x++) {
    for (let y = 1; y < numberOfRow + 1; y++) {
        let card = document.createElement("div"),
            front = document.createElement("div"),
            back = document.createElement("div"),
            img = document.createElement("img");
        img.src = `./img/${ImageArray[Index]}.jpg`;
        Index++;
        img.draggable = "false";

        card.classList.add("card");
        front.classList.add("face", "front");
        back.classList.add("face", "back");

        back.appendChild(img);
        card.appendChild(front);
        card.appendChild(back);
        container.appendChild(card);
    }
}

var cards = document.querySelectorAll(".card");
cards.forEach((element) => {
    element.addEventListener("click", () => {
        //! Si la partie est finie
        if(!numberOfPairsRemaining) { alert('Vous avez déja complété cette partie.'); return; }

        //! Si c'est une carte trouvée on annule
        if (element.classList.contains("found")) { return; }

        //! Si le 1er choix est pas fait on continue
        if (!firstChoice) {
            firstChoice = element;
            element.classList.add("show");
            return;
        }

        if ((firstChoice && !secondChoice) && (firstChoice != element)) {
            secondChoice = element;
            element.classList.add("show");

            if (firstChoice.querySelector("img").getAttribute("src") == secondChoice.querySelector("img").getAttribute("src")) {
                firstChoice.classList.add("found");
                secondChoice.classList.add("found");
                numberOfPairsRemaining--;

                //! On verif si le jeu est terminé
                if(!numberOfPairsRemaining) {  
                    setTimeout(() => {
                    alert('Vous avez gagné !'); return;
                }, 700); }

                firstChoice = null;
                secondChoice = null;
            } else {
                setTimeout(() => {
                    firstChoice.classList.remove("show");
                    secondChoice.classList.remove("show");
                    firstChoice = null;
                    secondChoice = null;
                }, 1000);
            }

            return;
        }
    });
});
