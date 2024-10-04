import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import cookie from "cookie";

export default async function handler (req: NextApiRequest, res: NextApiResponse){

    const axios = require('axios').default;
    const auth = await axios.get("http://localhost:3000/api/auth");
    
    if(auth){
        res.setHeader('Set-Cookie', 'auth=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/');
        return res.status(200).json({ message: 'Cookie deleted' })
    }
}