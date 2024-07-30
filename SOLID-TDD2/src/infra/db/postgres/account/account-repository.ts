import { IAddAccountRepository } from "../../../../data/protocols/iadd-account-repository";
import { IAddAccountModel } from "../../../../domain/models/add-account";
import { IAccountModel } from "../../../../domain/protocols/account";
import { PgHelper } from "../../helpers/pg-helper";

export class PgAccountRepository implements IAddAccountRepository {
    async add(account: IAddAccountModel): Promise<IAccountModel> {
        await PgHelper.connect()
        const user = await PgHelper.client.query<IAccountModel>("INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *", [account.name, account.email, account.password])
        if (user.rows.length <= 0) {
            return new Promise((resolve, reject) => reject(new Error()))
        }
        return new Promise(resolve => resolve(user.rows[0]))
    }
}