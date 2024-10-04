import {PrismaClient} from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import PokemonServices from "../services/Pokemon";
import cookie from "cookie";
import jwt from 'jsonwebtoken';
import { secret } from '@/pages/api/secret';
import { JwtPayload } from 'jsonwebtoken';
import { favPokemon } from '@/interfaces/interfaces';

interface UserPayload extends JwtPayload {
    id: number;
}

const prisma = new PrismaClient();

export default {
    async addFavPokemon(req: NextApiRequest, res: NextApiResponse) {
        const cookies = cookie.parse(req.headers.cookie || '');
        const token = cookies.auth;
        try {
            const decoded = jwt.verify(token, secret) as UserPayload;
            const userId = decoded.id;
            const pokemonId = req.body.idPokemon;
            const addFavPokemon = PokemonServices.addFavPokemon({idUser: userId, idPokemon:pokemonId as number});
        } catch (err) {
            res.status(404).json({message: "Not authorized"});
        }
    },

    async removeFavPokemon(req: NextApiRequest, res: NextApiResponse) {
        const cookies = cookie.parse(req.headers.cookie || '');
        const token = cookies.auth;
        try {
            const decoded = jwt.verify(token, secret) as UserPayload;
            const userId = decoded.id;
            const pokemonId = req.body.idPokemon;
            await PokemonServices.removeFavPokemon({ idUser: userId, idPokemon: pokemonId as number });
            res.status(200).json({ message: "Pokemon removed from favorites" });
        } catch (err) {
            res.status(401).json({ message: "Not authorized" });
        }
    },

    async getFavPokemons(req: NextApiRequest, res: NextApiResponse) {
        const cookies = cookie.parse(req.headers.cookie || '');
        const token = cookies.auth;
        try{
            const decoded = jwt.verify(token, secret) as UserPayload;
            const userId = decoded.id;
            const favPokemon = await PokemonServices.getFavPokemons(Number(userId));
            return res.status(200).json(favPokemon);
        }catch(error){
            return res.status(500).json({message: "Erro ao buscar Pokémon"});
        }

    }
    
    
}
