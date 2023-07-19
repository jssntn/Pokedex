import { PrismaClient } from '@prisma/client';
import { compare } from 'bcrypt';

export default async function Login(username: string, senha: string): Promise<boolean> {
    const prisma = new PrismaClient();
    const user = await prisma.user.findFirst({
        where: {
            username: username
        }
    });
    if (user) {
        return new Promise((resolve, reject) => {
            compare(senha, user.password, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    } else {
        return false;
    }
}
