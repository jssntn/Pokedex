import UserService from "@/services/UserService";
import SingUp from "@/services/SingUp";
import {PrismaClient} from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default{
    async Cadastro(req: NextApiRequest, res: NextApiResponse){
        try{
            if(await UserService.VerifyUsermame(req.body.username)){
                res.status(400).json({error: "Username already exists"});
            }

            const {name, username, password} = req.body;

            const user = await SingUp(name, username, password);

            return res.status(200).json(user);

         }catch(error){
            
            if(error instanceof Error){
                return res.status(400).json({message: error.message});
            }
            return res.status(500).json({message: "unknown error"});
         }
    }
}
