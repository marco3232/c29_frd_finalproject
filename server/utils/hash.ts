import { compare, hash } from "bcryptjs"
import * as bcrypt from "bcryptjs"


const ROUND = 12

export function hashPassword(password: string): Promise<string> {
    return hash(password, ROUND)
}

// doctor Adam 
export async function hashedPassword(plainPassword: string) {
    const hash: string = await bcrypt.hash(plainPassword, ROUND);
    return hash;
}

export async function comparePassword(
    password_input: string,
    password_hash: string
) {
    let result = await compare(password_input, password_hash);

    return result
}



export async function checkPassword(options: {
    plainPassword: string;
    hashedPassword: string;
}) {
    const isMatched: boolean = await bcrypt.compare(
        options.plainPassword,
        options.hashedPassword
    );
    return isMatched;
}