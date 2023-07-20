import { PrismaClient } from '@prisma/client';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { secret } from '@/pages/api/secret';


export default async function Login(username: string, senha: string): Promise<string | false> {
    const prisma = new PrismaClient();
    const user = await prisma.user.findFirst({
        where: {
            username: username
        }
    });

    if (user) {
        const isPasswordValid = await new Promise((resolve, reject) => {
            compare(senha, user.password, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
        if (isPasswordValid) {
            // Gerar token JWT com o ID do usuário
            const claims = {id: user.idUser, name: user.name };
            const token = sign(claims, secret);
            
            return token;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
