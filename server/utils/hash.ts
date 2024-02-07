import { compare, hash } from "bcrypt";

const saltRounds = 16;

export async function hashPassword(password_input:string){
    let hashed = await hash(password_input, saltRounds);

    return hashed
}

export async function comparePassword(
    password_input:string,
    password_hash: string
){
    let result = await compare(password_input, password_hash);
    return result
}