import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Pokemon, pokemonCardProps } from '@/interfaces/interfaces'
import PokemonCard from '@/components/pokemonCard/pokemonCard'

const inter = Inter({ subsets: ['latin'] })

// testes componente Card

const pokemon:Pokemon = {
  idPokemon: 2,
  name: "Bulbasaur",
  img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
  types: ["GRASS", "POISON"],
  isFavorite: false
}

export default function Home() {
  return (
    <div className={styles.wrapper}>

      <img className={styles.logo} src="/img/logo.svg" alt="logo.svg" />

      <div className={styles.search}>
      <input className={styles.searchInput} placeholder='Pesquisar pokémon'></input>

      <button className={styles.searchButton}><img src="/img/searchIcon.svg" alt="searchIcon.svg" /></button>
      </div>

      
      <main>
        <h1>Pokedex</h1>
        <div className={styles.cards}>
          {[...Array(27)].map((_, i) => (
            <PokemonCard key={i} pokemon={pokemon} />
          ))}
        </div>
      </main>
      <footer>
        <p>Com 💛 Info Jr UFBA 2022</p>
      </footer>
    </div>
  );
}

