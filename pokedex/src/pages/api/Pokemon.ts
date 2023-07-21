import PokemonControllers from "@/controllers/PokemonControllers";
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";


export default async function handler (req: NextApiRequest, res: NextApiResponse){
    const axios = require('axios').default;
    const auth = await axios.get("http://localhost:3000/api/auth");
    console.log(auth);
    if(auth)
    { 
        switch(req.method){
            case 'POST':
                await PokemonControllers.addFavPokemon(req, res);
                break;
            case 'PUT':
                await PokemonControllers.removeFavPokemon(req, res);
                break;
            case 'GET':
                await PokemonControllers.getFavPokemons(req, res);
                break;
            default:
                res.status(405).end();
                break;

        }
    }
    else{
        res.status(401).json({message: "Not authorized"});
    }
}