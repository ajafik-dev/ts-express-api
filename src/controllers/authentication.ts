import { createUser, getUserByEmail } from "./../db/users";
import express from "express";
import { authentication, random } from "./../helpers";


export const register = async (req: express.Request, res: express.Response) => {
    try {
        const email: string = req.body?.email;
        const password: string = req.body?.password;

        const username: string = req.body?.username;

        if(!email || !password || !username){
            return res.sendStatus(400);
        }

        const existingUser = await getUserByEmail(email);
        if(existingUser){
            return res.sendStatus(400);
        }

        const salt = random();
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password)
            }
        });

       return  res.status(200).json(user).end();

    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}