import Login from "@/controllers/Login";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler (req: NextApiRequest, res: NextApiResponse){
    
    if(req.method === 'POST'){
         Login.Login(req, res)
    }else{
        return res.status(405).json({message: "Method not allowed"});
    }

}