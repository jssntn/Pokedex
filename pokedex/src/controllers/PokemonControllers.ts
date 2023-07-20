import {PrismaClient} from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import PokemonServices from "../services/Pokemon";
import cookie from "cookie";

const prisma = new PrismaClient();

export default{
    async addFavPokemon(req: NextApiRequest, res: NextApiResponse){
        const cookies = cookie.parse(req.headers.cookie || '')
        // const jwt = cookie.auth;
    }
}