import UserService from "@/services/UserService";
import Login from "@/services/Login";
import {PrismaClient} from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';
import cookie from 'cookie';


const prisma = new PrismaClient();

export default {
    async Login(req: NextApiRequest, res: NextApiResponse){
        try{

            const{username, password} = req.body;

            if(!(await UserService.VerifyUsermame(username))){
                return res.status(404).json({error: "user not find"});
            }

            const jwt = await Login(username, password);

            if(jwt){
                res.setHeader('Set-Cookie', cookie.serialize('auth', jwt, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    sameSite: 'strict',
                    maxAge: 3600,
                    path: '/'
                }));
                return res.status(200).json({message: "Login success"});
            }
               
            return res.status(400).json({message: "Senha incorreta"}); 
                 
        } catch(error){
            
            if(error instanceof Error){
                return res.status(400).json({message: error.message});
            }
            return res.status(500).json({message: "unknown error"});
        }
    }
}