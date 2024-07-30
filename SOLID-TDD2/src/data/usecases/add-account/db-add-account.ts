import { IAccountModel, IAddAccount, IAddAccountModel, IAddAccountRepository, IHasher } from './db-add-account-protocols'

export class DbAddAccount implements IAddAccount {
    constructor(
        private readonly hasherStub: IHasher,
        private readonly addAccountRepo: IAddAccountRepository
    ) {}
    async add(account: IAddAccountModel): Promise<IAccountModel> {
        const hashedValue = await this.hasherStub.hash(account.password)
        const user = await this.addAccountRepo.add(Object.assign({}, account, { password: hashedValue }))
        return user
    }
}