'use client'
import {Pokemon, pokemonCardProps} from '@/interfaces/interfaces'
import styles from './pokemonCard.module.css'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';
import axios from 'axios';

export default function PokemonCard(props:pokemonCardProps){

    const [favIcon, setFavicon] = useState<boolean>(false);
    const typeBackground:Record<string,string> = {
        GRASS: 'rgb(120, 200, 80)',
        FIRE: 'rgb(240, 80, 48)',
        BUG: 'rgb(238, 129, 48)',
        DARK: 'rgb(112, 88, 72)',
        DRAGON: 'rgb(112, 56, 248)', 
        ELECTRIC: 'rgb(248, 208, 48)',
        FAIRY: 'rgb(238, 129, 48)',
        FIGHTING: 'rgb(144, 48, 40)',
        FLYING: 'rgb(168, 144, 240)',
        GHOST: 'rgb(112, 88, 152)',
        GROUND: 'rgb(224, 192, 104)',
        ICE: 'rgb(152, 216, 216)',
        NORMAL: 'rgb(168, 168, 120)',
        POISON: 'rgb(160, 64, 160)',
        PSYCHIC: 'rgb(248, 88, 136)',
        ROCK: 'rgb(184, 160, 56)',
        STELL: 'rgb(235, 139, 141)',
        WATER: 'rgb(104, 144, 248)',
    };


    const backgroundColor = () =>{
        const rgb = typeBackground[props.pokemon.types[0]];
        const rgba = rgb.replace('rgb', 'rgba').replace(')', ', 0.1)');
        return rgba;
    };

    const handleFavorite = async() =>{
        const response = await axios.post('http://localhost:3000/api/Pokemon', {idPokemon:props.pokemon.idPokemon});
            
    };

    const handleUnfavorite = async() =>{
        const response = await axios.put('http://localhost:3000/api/Pokemon', {idPokemon:props.pokemon.idPokemon});
        props.pokemon.isFavorite = false;
    };


    return (
        <div style={{backgroundColor:backgroundColor()}} className={styles.Card}>
            <div className={styles.pokeInfo}>
                <h3>{props.pokemon.name}</h3>
                {props.pokemon.types.slice(0,3).map(type =><p><span style={{ backgroundColor:typeBackground[type]}}>{type}</span></p>)}
            </div>
            <img className={props.pokemon.idPokemon==1?styles.pokeImg1 : styles.pokeImg} src={props.pokemon.img} alt={props.pokemon.name + "image"}/>
            {props.pokemon.isFavorite? <FontAwesomeIcon onClick={handleUnfavorite} className={styles.favIcon} icon={faStar} style={{color:"yellow", display:"none"}}/>: <FontAwesomeIcon onClick={handleFavorite} className={styles.favIcon} icon={farStar} style={{color:"yellow", display:"none"}} />}

        </div>
    )
}

