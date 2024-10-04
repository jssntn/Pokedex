import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

class UserServices {
    public async VerifyUsermame(username:string):Promise<boolean>{
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        });

        if(user){
            return true;
        }else{
            return false;
        }
    }
}

export default new UserServices();
