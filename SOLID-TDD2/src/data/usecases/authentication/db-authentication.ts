import { AuthenticationModel, IAuthentication } from "../../../domain/usecases/authentication";
import { IHashComparer } from "../../protocols/criptography/icomparer";
import { ITokenGenerator } from "../../protocols/criptography/itoken-generator";
import { ILoadByEmail } from "../../protocols/db/load-by-email";
import { IUpdateAccessToken } from "../../protocols/db/update-access-token";

export class DbAuthentication implements IAuthentication {
    constructor (
        private readonly LoadByEmail: ILoadByEmail,
        private readonly HashComparer: IHashComparer,
        private readonly TokenGenerator: ITokenGenerator,
        private readonly UpdateAccessToken: IUpdateAccessToken
    ) {}
    async authenticate(account: AuthenticationModel): Promise<string | null> {
        const foundAccount = await this.LoadByEmail.load(account.email)
        if (!foundAccount) {
            return new Promise(resolve => resolve(null))
        }
        const result = await this.HashComparer.compare(account.password, foundAccount.password)
        if (!result) {
            return new Promise(resolve => resolve(null))
        }
        const token = await this.TokenGenerator.generate(foundAccount.id)
        await this.UpdateAccessToken.update(foundAccount.id, token)
        return new Promise(resolve => resolve(''))
    }
}