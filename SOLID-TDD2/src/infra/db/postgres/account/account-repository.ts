import { IAddAccountRepository } from "../../../../data/protocols/iadd-account-repository";
import { IAddAccountModel } from "../../../../data/protocols/add-account";
import { IAccountModel } from "../../../../domain/models/account";
import { PgHelper } from "../../helpers/pg-helper";

export class PgAccountRepository implements IAddAccountRepository {
    async add(account: IAddAccountModel): Promise<IAccountModel> {
        await PgHelper.connect()
        const user = await PgHelper.query("INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *", [account.name, account.email, account.password])
        if (user.rows.length > 0) {
            return new Promise(resolve => resolve(user.rows[0]))
        }else {
            throw new Error()
        }
    }
}