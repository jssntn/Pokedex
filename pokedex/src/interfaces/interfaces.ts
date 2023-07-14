export interface Pokemon {
    idPokemon: Number,
    name: string,
    types: string[],
    img: string,
    isFavorite: boolean,
  }

export interface pokemonCardProps{
    pokemon: Pokemon
}