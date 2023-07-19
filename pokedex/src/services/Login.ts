import { PrismaClient, User } from "@prisma/client";
import { Prisma } from "@prisma/client";

export default async function Login(username: string, senha: string): Promise<User | null> {
    const prisma = new PrismaClient();
    const user = await prisma.user.findFirst({
        where: {
            username: username,
            password: senha
        }
    });
    
    return user;
}