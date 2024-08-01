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
        await this.LoadByEmail.load(account.email)
        return new Promise(resolve => resolve(null))
    }
}