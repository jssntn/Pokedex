import { PrismaClient } from "@prisma/client";

export default async function SingUp(name:string, user:string, password:string){
    const prisma = new PrismaClient();
    const newUser = await prisma.user.create({
        data: {
        name: name,
        username:user,
        password:password
    }
    });

    return newUser;
}
