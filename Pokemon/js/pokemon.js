const getPokemon = async (offset=0, limit=5)=>{

    let pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`);
    pokemon = await pokemon.json();

    if(pokemon.results){
        for(let index = 0; index < pokemon.results.length; index++) {
            const pokemondata = await fetch(pokemon.results[index].url);
            pokemon.results[index].data = await pokemondata.json();
        }
    }
    return pokemon;
}

const setPokemonAleatorio = (AleatorioPokemon)=>{
    let $divAleatorio = document.querySelector('.owl-carousel');
    $($divAleatorio).trigger('destroy.owl.carousel');
    let html = '';
    $divAleatorio.innerHTML = html;
    console.log(AleatorioPokemon);


    for(let i=0; i<AleatorioPokemon.results.length; i++){
        html= html + `
        <div class="item">
            <div class="image_box">
                <img src="${AleatorioPokemon.results[i].data.sprites.front_default}" alt="#" />
            </div>
            <h3 class="sound_text">${AleatorioPokemon.results[i].name}</h3>
            <h4 class="sound_text">${AleatorioPokemon.results[i].data.species.name}</h4>
            
        </div>
        `;
    }
    $divAleatorio.innerHTML = html;
    $($divAleatorio).owlCarousel({

    });

}

window.addEventListener('load', async function(){ 
    const esperarPorElemento = async () => {
        const $divAleatorio = this.document.querySelector('.aleatorio');
        if ($divAleatorio){
            let min = 1;
            let max = 1292;
            let aleatorio = Math.floor(Math.random() * (max - min)) + min;
            let AleatorioPokemon = await getPokemon(aleatorio,10);
            setPokemonAleatorio(AleatorioPokemon);

        } else {
            setTimeout(esperarPorElemento, 100);
        }
    };

    esperarPorElemento();
    
});