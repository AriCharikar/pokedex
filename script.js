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
const powerButton = document.querySelector('.power-button');

//Pokemon types for background colors
const types = [
    'normal', 'fighting', 'flying',
    'poison', 'ground', 'rock',
    'electric', 'psychic', 'ice',
    'dragon', 'dark', 'fairy',
    'bug', 'ghost', 'steel',
    'fire', 'water', 'grass'
];


//Initialized pokemon list for initial load
getPokemonList('https://pokeapi.co/api/v2/pokemon?offset=0&limit=5');


//Event listeners
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
    } else {
        screen.classList.add('hidden');
    }
});

for (const pokemonItem of pokemonList) {
    pokemonItem.addEventListener('click', function (e) {
        const id = e.target.textContent.split('.')[0];
        getPokemonData(id);
    });
}

//Functions for pokemon display container
function getPokemonData(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(res => res.json())
    .then(data => {
        screen.classList.remove('hidden');
        screen.classList.remove(...types);
        
        pokemonName.textContent = data.name;
        pokemonID.textContent = '#' + data.id;

        pokemonFront.src = data.sprites.front_default;
        pokemonBack.src = data.sprites.back_default;
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