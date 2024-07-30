import { IAddAccount, IAddAccountModel } from "../../../domain/models/add-account";
import { IAccountModel } from "../../../domain/protocols/account";
import { IAddAccountRepository } from "../../protocols/iadd-account-repository";
import { IHasher } from "../../protocols/ihasher";

export class DbAddAccount implements IAddAccount {
    constructor(
        private readonly hasherStub: IHasher,
        private readonly addAccountRepo: IAddAccountRepository
    ) {}
    add(account: IAddAccountModel): Promise<IAccountModel> {
        const hashedValue = this.hasherStub.hash(account.password)
        return new Promise(resolve =>resolve({} as any))
    }
}