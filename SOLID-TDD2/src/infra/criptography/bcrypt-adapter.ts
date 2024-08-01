import { IHashComparer } from "../../data/protocols/criptography/icomparer";
import { IHasher } from "../../data/protocols/criptography/ihasher";
import bcrypt from 'bcrypt'

export class BcryptAdapter implements IHasher, IHashComparer {
    constructor(private readonly salt: number) {}
    async hash(value: string): Promise<string> {
        const hashedValue = await bcrypt.hash(value, this.salt)
        return hashedValue
    }

    async compare(value: string, valueToCompare: string): Promise<boolean> {
        const result = await bcrypt.compare(value, valueToCompare)
        return result
    }
}