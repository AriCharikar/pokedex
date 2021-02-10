//DOM elements referencing specific HTML
const pokemonName = document.querySelector('.pokemon-name');
const pokemonID = document.querySelector('.pokemon-ID');
const pokemonFront = document.querySelector('.pokemon-front-image');
const pokemonBack = document.querySelector('.pokemon-back-image');
const pokemonTypeOne = document.querySelector('.pokemon-type-one');
const pokemonTypeTwo = document.querySelector('.pokemon-type-two');
const pokemonList = document.querySelectorAll('.poke-list');
const screen = document.querySelector('.screen');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');

//Event listeners
prevButton.addEventListener('click', prevButtonClick);
nextButton.addEventListener('click', nextButtonClick);
for (const pokemonItem of pokemonList) {
    pokemonItem.addEventListener('click', clickPokemonItem);
}

//Initialized Buttons
let prevURL = null;
let nextURL = null;

//Functions for pokemon display container

function removeBackgroundColor() {
    const types = [
        'normal', 'fighting', 'flying',
        'poison', 'ground', 'rock',
        'bug', 'ghost', 'steel',
        'fire', 'water', 'grass',
        'electric', 'psychic', 'ice',
        'dragon', 'dark', 'fairy'
    ];

    for(const type of types) {
        screen.classList.remove(type);
    }
}

function getPokemonData(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(res => res.json())
    .then(data => {
        screen.classList.remove('hidden');

        removeBackgroundColor();
        
        pokemonName.textContent = data.name;
        pokemonID.textContent = '#' + data.id.toString().padStart(3, '0');

        pokemonFront.src = data.sprites.front_default || '';
        pokemonBack.src = data.sprites.back_default || '';
        if(!data.sprites.back_default) {
            pokemonFront.style.margin = '0px';
            pokemonBack.style.margin = '0px';
        }
        
        const pokemonType = data.types;
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
    .then(data => {
        const resultArray = data.results;
        nextURL = data.next;
        prevURL = data.previous;
        
        for (let i = 0; pokemonList.length; i++) {
            const pokemonItem = pokemonList[i];
            const pokemonInfoData = resultArray[i];

            if (pokemonInfoData) {
                const nameDisplay = pokemonInfoData.name;
                const idDisplay = pokemonInfoData.url;
                const urlArray = idDisplay.split('/');
                const id = urlArray[urlArray.length - 2];
                pokemonItem.textContent = id + '. ' + nameDisplay;
            } else {
                pokemonItem.textContent = '';
            }
        }
});
}

function nextButtonClick(e) {
    if(nextURL === "https://pokeapi.co/api/v2/pokemon?offset=150&limit=5") {
        return;
    }
    getPokemonList(nextURL);
}

function prevButtonClick(e) {
    if(prevURL) {
        getPokemonList(prevURL);
    }
}

function clickPokemonItem(e) {
    if (!e.target) return;

    const listItem = e.target;
    if (!listItem.textContent) return;

    const id = listItem.textContent.split('.')[0];
    getPokemonData(id);
}


//Initialized pokemon list for initial click

getPokemonList('https://pokeapi.co/api/v2/pokemon?offset=0&limit=5');