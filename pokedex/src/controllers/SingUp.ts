import UserService from "@/services/UserService";
import SingUp from "@/services/SingUp";
import {PrismaClient} from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { hash } from "bcrypt";

const prisma = new PrismaClient();

export default{
    async Cadastro(req: NextApiRequest, res: NextApiResponse){
        try{
            if(await UserService.VerifyUsermame(req.body.username)){
                res.status(400).json({error: "Username already exists"});
            }

            hash(req.body.password, 10, async (err, password) => {
            const {name, username} = req.body;
    

            const user = await SingUp(name, username, password);

            return res.status(200).json(user);
            });

         }catch(error){
            
            if(error instanceof Error){
                return res.status(400).json({message: error.message});
            }
            return res.status(500).json({message: "unknown error"});
         }
    }
}
