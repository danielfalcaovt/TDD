import { IHasher } from "../../data/protocols/ihasher";
import bcrypt from 'bcrypt'

export class BcryptAdapter implements IHasher {
    constructor(private readonly salt: number) {}
    async hash(value: string): Promise<string> {
        const hashedValue = await bcrypt.hash(value, this.salt)
        return hashedValue
    }
}