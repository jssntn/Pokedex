import { PrismaClient } from "@prisma/client";
import {favPokemon} from "@/interfaces/interfaces"

const prisma = new PrismaClient();

class PokemonServices{
    public async addFavPokemon(favPokemon:favPokemon){
        const pokemon = await prisma.favPokemon.create(
            {
                data: {
                    idUser: favPokemon.idUser as number,
                    idPokemon: favPokemon.idPokemon as number
                }
            }
        );
    }

    public async removeFavPokemon(favPokemon:favPokemon){
        const pokemon = await prisma.favPokemon.delete(
            {
                where: {
                    idPokemon_idUser:{
                        idUser: favPokemon.idUser as number,
                        idPokemon: favPokemon.idPokemon as number
                    }
                },
            },
        );
    }

    public async getFavPokemons(idUser:number): Promise<favPokemon[]>{
        const favPokemon = await prisma.favPokemon.findMany({
            where:{
                idUser: idUser
            }
        });
        return favPokemon;
    }
}

export default new PokemonServices();
