import PokemonControllers from "@/controllers/PokemonControllers";
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";


export default async function handler (req: NextApiRequest, res: NextApiResponse){
    const axios = require('axios').default;
    const cookies = req.headers.cookie;
    const { data } = await axios.get('http://localhost:3000/api/auth', {
        headers: {
            Cookie: cookies,
        },
    });
    
    if(data)
    { 
        switch(req.method){
            case 'POST':
                await PokemonControllers.addFavPokemon(req, res);
                res.status(200).end();
                break;
            case 'PUT':
                await PokemonControllers.removeFavPokemon(req, res);
                res.status(200).end();
                break;
            case 'GET':
                await PokemonControllers.getFavPokemons(req, res);
                res.status(200).end();
                break;
            default:
                res.status(405).end();
                break;

        }
    }
    
}