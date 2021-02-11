//DOM elements referencing specific HTML
const pokemonName = document.querySelector('.pokemon-name');
const pokemonID = document.querySelector('.pokemon-ID');
const pokemonFront = document.querySelector('.pokemon-front-image');
const pokemonBack = document.querySelector('.pokemon-back-image');
const pokemonTypeOne = document.querySelector('.pokemon-type-one');
const pokemonTypeTwo = document.querySelector('.pokemon-type-two');
const pokemonList = document.querySelectorAll('.poke-list');
const aboveScreen = document.querySelector('.above-screen-container');
const screenContainer = document.querySelector('.screen-container');
const belowScreen = document.querySelector('.below-screen-container');
const screen = document.querySelector('.screen');
const selectorContainer = document.querySelector('.selector-container');
const pokemonSelectorContainer = document.querySelector('.pokemon-selector-container');
const pokemonSelectorSpecific = document.querySelector('.pokemon-selector-specific');
const pokemonSelectorNavigator = document.querySelector('.pokemon-selector-navigator');
const screenBorder = document.querySelector('.screen-border');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const powerButton = document.querySelector('.power-button');
const optionButtonY = document.querySelector('.option-button-yellow');
const optionButtonG = document.querySelector('.option-button-green');
const optionButtonR = document.querySelector('.option-button-red');
const controllerButton = document.querySelector('.controller-button');
const controllerSquare = document.querySelector('.controller-square');
const pokeChangerOne = document.querySelector('.pokemon-selector-one');
const pokeChangerTwo = document.querySelector('.pokemon-selector-two');
const pokeChangerThree = document.querySelector('.pokemon-selector-three');
const pokeChangerFour = document.querySelector('.pokemon-selector-four');
const pokeChangerFive = document.querySelector('.pokemon-selector-five');
const prevButtonElement = document.querySelector('.prev-button button');
const nextButtonElement = document.querySelector('.next-button button');

//Pokemon types for background colors, heavily inspired by Justin Kim's tutorial on youtube to help classify the pokemon into different categories based on their type and then to change their bakground. Also a list for the different colors that can change the background of the screen border
const types = [
    'normal', 'fighting', 'flying',
    'poison', 'ground', 'rock',
    'electric', 'psychic', 'ice',
    'dragon', 'dark', 'fairy',
    'bug', 'ghost', 'steel',
    'fire', 'water', 'grass'
];

const colors = [
    'blue', 'aqua', 'teal',
    'olive', 'green', 'lime'
];

const fonts = [
    'Arial', 'Times', 'sans-serif', 'Helvetica'
]

//Initialized pokemon list for initial load
getPokemonList('https://pokeapi.co/api/v2/pokemon?offset=0&limit=5');


//Event listeners
optionButtonR.addEventListener('click', function() {
    const randomColorR = Math.floor(Math.random() * colors.length);
    screenBorder.style.background = colors[randomColorR];
});

optionButtonY.addEventListener('click', function() {
    const randomColorY = Math.floor(Math.random() * colors.length);
    screenBorder.style.border = `8px solid ${colors[randomColorY]}`;
});

optionButtonG.addEventListener('click', function() {
    screenBorder.style.background = 'black';
    screenBorder.style.border = '8px solid grey';
});

controllerSquare.addEventListener('click', function() {
    const randomBGColor = Math.floor(Math.random() * colors.length);
    aboveScreen.style.background = colors[randomBGColor];
    screenContainer.style.background = colors[randomBGColor];
    belowScreen.style.background = colors[randomBGColor];
    pokemonSelectorContainer.style.background = colors[randomBGColor];
    selectorContainer.style.background = colors[randomBGColor];
    pokemonSelectorNavigator.style.background = colors[randomBGColor];
    pokemonSelectorSpecific.style.background = colors[randomBGColor];
})

controllerButton.addEventListener('click', function() {
    aboveScreen.style.background = 'red';
    screenContainer.style.background = 'red';
    belowScreen.style.background = 'red';
    pokemonSelectorContainer.style.background = 'red';
    selectorContainer.style.background = 'red';
    pokemonSelectorNavigator.style.background = 'red';
    pokemonSelectorSpecific.style.background = 'red';
})

prevButton.addEventListener('click', function(e) {
    if(prevURL) {
        getPokemonList(prevURL);
    }
});

nextButton.addEventListener('click', function(e) {
    if(nextURL === "https://pokeapi.co/api/v2/pokemon?offset=150&limit=5") {
        return;
    }
    getPokemonList(nextURL);
});

powerButton.addEventListener('click', function() {
    if (screen.classList.contains('hidden')) {
        const randomPokemon = Math.floor(Math.random() * 151);
        getPokemonData(randomPokemon);
        powerButton.style.background = 'black';
        powerButton.style.border = '3px solid white';
    } else {
        screen.classList.add('hidden');
        powerButton.style.background = 'rgb(74, 183, 255)';
        powerButton.style.border = '3px solid black';

    }
});

for (const pokemonItem of pokemonList) {
    pokemonItem.addEventListener('click', function(e) {
        const id = e.target.textContent.split('.')[0];
        getPokemonData(id);
    });
}

pokeChangerOne.addEventListener('click', function() {
    const randomButtonColor = Math.floor(Math.random() * colors.length);
    prevButtonElement.style.background = colors[randomButtonColor];
    nextButtonElement.style.background = colors[randomButtonColor];
});

pokeChangerTwo.addEventListener('click', function() {
    const randomFont = Math.floor(Math.random() * fonts.length);
    prevButtonElement.style.fontFamily = fonts[randomFont];
    nextButtonElement.style.fontFamily = fonts[randomFont];
});

pokeChangerThree.addEventListener('click', function() {
    const randomBorder = Math.floor(Math.random() * 5);
    prevButtonElement.style.border = `${randomBorder}px solid black`;
    nextButtonElement.style.border = `${randomBorder}px solid black`;
});

pokeChangerFour.addEventListener('click', function() {
    const randomFontWeight = Math.floor(Math.random() * 8) * 100;
    prevButtonElement.style.fontWeight = randomFontWeight;
    nextButtonElement.style.fontWeight = randomFontWeight;
    console.log(randomFontWeight);
});

pokeChangerFive.addEventListener('click', function() {
    prevButtonElement.style.fontWeight = '400';
    prevButtonElement.style.border = '3px solid black';
    prevButtonElement.style.background = 'white';
    nextButtonElement.style.fontWeight = '400';
    nextButtonElement.style.border = '3px solid black';
    nextButtonElement.style.background = 'white';
});

//Functions for pokemon display container
function getPokemonData(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(res => res.json())
    .then(pokemon => {
        screen.classList.remove('hidden');
        screen.classList.remove(...types);
        powerButton.style.background = 'black';
        powerButton.style.border = '3px solid white';
        
        pokemonName.textContent = pokemon.name;
        pokemonID.textContent = '#' + pokemon.id;

        pokemonFront.src = pokemon.sprites.front_default;
        pokemonBack.src = pokemon.sprites.back_default;
        if(!pokemon.sprites.back_default) {
            pokemonFront.style.margin = '0px';
            pokemonBack.style.margin = '0px';
        }
        
        const pokemonType = pokemon.types;
        pokemonTypeOne.textContent = pokemonType[0]['type']['name'];
        screen.classList.add(pokemonType[0]['type']['name']);
        
        const secondType = pokemonType[1];
        if(secondType) {
            pokemonTypeTwo.textContent = pokemonType[1]['type']['name'];
            pokemonTypeOne.style.margin = '0px 25px';
            pokemonTypeTwo.style.margin = '0px 25px';
        } else {
            pokemonTypeTwo.textContent = '';
            pokemonTypeOne.style.margin = '0px';
            pokemonTypeTwo.style.margin = '0px';
        }
    })
}

//Functions for pokemon selector container

function getPokemonList(url) {
    fetch(url)
    .then(res => res.json())
    .then(pokemon => {
        const resultArray = pokemon.results;
        nextURL = pokemon.next;
        prevURL = pokemon.previous;
        
        //For loop was inpsired by Justin Kim's tutorial on youtube, which explains to use a for loop instead of a for of loop in order to retrieve the index of the looped item.
        for (let i = 0; resultArray.length; i++) {
            const pokemonItem = pokemonList[i];
            const pokemonInfoData = resultArray[i];
            const nameDisplay = pokemonInfoData.name;
            const idDisplay = pokemonInfoData.url;
            const urlArray = idDisplay.split('/');
            const id = urlArray[urlArray.length - 2];
            pokemonItem.textContent = id + '. ' + nameDisplay;
        }
});
}

//Shoutout to Justin Kim's tutorial on making a pokedex which helped me understand how to code this project and inspiration for the dryness of my Javascript. https://www.youtube.com/watch?v=wXjSaZb67n8&t=1s&ab_channel=JustinKim