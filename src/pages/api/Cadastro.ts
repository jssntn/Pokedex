import SingUp from "@/controllers/SingUp";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (req: NextApiRequest, res: NextApiResponse){
    
    if(req.method === 'POST'){ 

         SingUp.Cadastro(req, res);

    }else{
        return res.status(405).json({message: "Method not allowed"});
    }

}