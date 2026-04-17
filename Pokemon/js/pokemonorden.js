let currentPokemonId = 1;
const maxPokemonId = 1302; // Número total de Pokémon en la PokéAPI
const priceBox = document.querySelector(".price_box");
const nextButton = document.querySelector(".pagination .page-item:nth-child(2) .page-link");
const prevButton = document.querySelector(".pagination .page-item:nth-child(1) .page-link");

async function fetchPokemon(id) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        displayPokemon(data);
    } catch (error) {
        console.error("Error fetching Pokémon:", error);
    }
}

function displayPokemon(pokemon) {
    priceBox.innerHTML = `
        <div class="pokemon-card text-center">
            <h3>${pokemon.name.toUpperCase()}</h3>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="img-fluid">
        </div>
    `;
}

nextButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (currentPokemonId < maxPokemonId) {
        currentPokemonId++;
        fetchPokemon(currentPokemonId);
    }
});

prevButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (currentPokemonId > 1) {
        currentPokemonId--;
        fetchPokemon(currentPokemonId);
    }
});

// Cargar el primer Pokémon al inicio
document.addEventListener("DOMContentLoaded", () => fetchPokemon(currentPokemonId));