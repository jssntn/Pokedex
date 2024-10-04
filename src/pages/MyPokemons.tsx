import { useState, useEffect } from 'react';
import styles from '@/styles/MyPokemons.module.css'
import Menu from '@/components/menu/menu'
import axios from 'axios'
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Pokemon, favPokemon } from '@/interfaces/interfaces';
import PokemonCard from '@/components/pokemonCard/pokemonCard';


export default function MyPokemons(){

    
    const [pokemon, setPokemon] = useState<Pokemon[]>([]);
    const [authorized, setAuthorized] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    
    const redirectHome = () =>{
      router.push('/');
  }
    const checkAuth = async () => {
      const res = await fetch('/api/auth')
      const data = await res.json()
      setAuthorized(data)
      setLoading(false)
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
          if (pokemon!==undefined && idFavPokemons.includes((pokemon).idPokemon as number)) {
            pokemon.isFavorite = true;
            return pokemon;
          }
        });
        setPokemon(newPokemon as Pokemon[]);
        
    }


    const handleLogout =async() => {
        const res = await axios.get('/api/Sair');
        router.push('/');
        
    }

    useEffect(() => {
        
        fetchPokemons();
        console.log(pokemon);
      }, []);

    useEffect(() => {
        if(pokemon.length>0){
          fetchFavPokemons();
        }
      }, [pokemon]);

      useEffect(() => {
        checkAuth();
        if (!loading && !authorized) {
          redirectHome();
        }
      }, [loading, authorized]);
      


    return(
          
              <div className={styles.wrapper}>
                  <div className={styles.header}>
                      <Menu onLogout={handleLogout}></Menu>
                      <img className={styles.logo} onClick={redirectHome} src="/img/logo.svg" alt="logo.svg" />
                  </div>
                  <div className={styles.title}>
                      <h1>Pokedex</h1>
                      <FontAwesomeIcon  className={styles.favIcon} icon={faStar} style={{color:"yellow",width: '30px',height: '30px'}}/>
                  </div>
                  <div className={styles.cards}>
                      {pokemon.map((poke) => (
                          poke!==undefined && poke.isFavorite && <PokemonCard pokemon={poke} />
                      ))}
                  </div>
              </div> 
        
    )
}