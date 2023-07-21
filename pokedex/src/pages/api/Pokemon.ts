import PokemonControllers from "@/controllers/PokemonControllers";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler (req: NextApiRequest, res: NextApiResponse){
    
    switch(req.method){
        case 'POST':
            await PokemonControllers.addFavPokemon(req, res);
            break;
        case 'PUT':
            await PokemonControllers.removeFavPokemon(req, res);
            break;
        default:
            res.status(405).end();
            break;

    }
}