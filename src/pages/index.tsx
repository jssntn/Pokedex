import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Pokemon, pokemonCardProps, favPokemon} from '@/interfaces/interfaces'
import PokemonCard from '@/components/pokemonCard/pokemonCard'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Login from '@/components/loginModal/login'
import Menu from '@/components/menu/menu'



const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  // UseStates
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [showLogin, setShowLogin] = useState<boolean>();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [onSearch, setOnSearch] = useState(false);
  const [searchPokemon, setSearchPokemon] = useState<Pokemon[]>([]);

  //Funções
  const handleLogin = () => {
    setShowLogin(false);
    setShowMenu(true);
    location.reload();

  }

  const handleLogout =async() => {
      const res = await axios.get('/api/Sair');
      setShowLogin(true);
      setShowMenu(false);
      
  }

  const checkAuth = async () => {
      const res = await fetch('/api/auth')
      const data = await res.json()
      setShowLogin(!data)
      setShowMenu(data)
  }

  const fetchPokemons = async () => {  //Função que faz a requisição para a API e armazena as informações dos pokemons em um useState
    
    const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=153'); //Retorna um JSON {name, url}
    
    const pokemonUrls = data.results.map((pokemonData: any) => pokemonData.url); //Armazena todas as urls em um array
    const responses = await Promise.all(pokemonUrls.map((url: string) => axios.get(url))); //Faz uma requisição para cada url e armazena um JSON com mais informações em um array

    const newPokemon = responses.map((response: any) => ({
      idPokemon: response.data.id as number,
      name: response.data.name as string,
      types: response.data.types.map((type: any) => type.type.name.toUpperCase() ) as string[],
      img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+response.data.id+'.png',
      isFavorite: false,
    }));

    setPokemon(newPokemon); //Guardando no usesState
  }

  const fetchFavPokemons = async () => { //fetch dos favoritos do usuário + att o useState
    const {data} = await axios.get('http://localhost:3000/api/Pokemon');
    const idFavPokemons:number[] = data.map((pokemon:favPokemon) => pokemon.idPokemon as number);
    const newPokemon = pokemon.map((pokemon: Pokemon) => {
      if (idFavPokemons.includes(pokemon.idPokemon as number)) {
        pokemon.isFavorite = true;
        return pokemon;
      } else {
        return pokemon;
      }
    });
    setPokemon(newPokemon);
    
  }

  //UseEffects
  useEffect(() => {
    fetchPokemons();
    checkAuth();
  
  }, []);

  useEffect(() => {
    if(pokemon.length>0){
      fetchFavPokemons();
    }
  }, [pokemon]);

 //Pokemon search

 const Search = (query: string) => {
  const filteredPokemon = pokemon.filter((pokemon) => {
    return pokemon.name.toLowerCase().startsWith(query.toLowerCase())
  });
  if(filteredPokemon.length>0){
    setOnSearch(true);
    setSearchPokemon(filteredPokemon);
  }

}

  return (
    <div className={styles.wrapper}>
      {!showMenu && <div className={styles.conditionalMargin}></div>}
      {showMenu && <Menu onLogout={handleLogout}></Menu> }
      {showLogin && <Login onLogin={handleLogin}></Login>}
      <img className={styles.logo} src="/img/logo.svg" alt="logo.svg" />

      <div className={styles.search}>
        <input className={styles.searchInput} value={search} onChange={e => setSearch(e.target.value)} placeholder='Pesquisar pokémon'></input>
        <button className={styles.searchButton} onClick={()=>Search(search)}><img src="/img/searchIcon.svg" alt="searchIcon.svg" /></button>
      </div>

      <h1>Pokedex</h1>
      <main>
        <div className={styles.cards}>
          {onSearch?
          searchPokemon.map((poke) => (
            <PokemonCard pokemon={poke} />
          )):
           pokemon.map((poke) => (
            <PokemonCard pokemon={poke} />
          ))}
        </div>
      </main>
      <footer>
        <p>Com 💛 Info Jr UFBA 2022</p>
      </footer>
    </div>
  );
}
