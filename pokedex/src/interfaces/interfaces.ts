
export interface Pokemon {
    idPokemon: Number,
    name: string,
    types: string[],
    img: string,
    isFavorite: boolean,
  }

  export interface favPokemon{
    idUser: Number,
    idPokemon: Number
  }
  

export interface pokemonCardProps{
    pokemon: Pokemon
}

export interface registerProps{
  setVisibility: (visibility: boolean) => void,
  onRegister:()=>void;
}

export interface loginProps{
  onLogin:()=>void;
}

export interface menuProps{
  onLogout:()=>void;
}

