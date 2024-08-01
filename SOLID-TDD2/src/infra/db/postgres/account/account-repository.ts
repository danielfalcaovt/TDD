import { IAddAccountRepository } from "../../../../data/protocols/db/iadd-account-repository";
import { IAddAccountModel } from "../../../../data/protocols/db/add-account";
import { IAccountModel } from "../../../../domain/models/account";
import { PgHelper } from "../../helpers/pg-helper";
import { ILoadByEmail } from "../../../../data/protocols/db/load-by-email";
import { IUpdateAccessToken } from "../../../../data/protocols/db/update-access-token";

export class PgAccountRepository implements IAddAccountRepository, ILoadByEmail, IUpdateAccessToken {
    async add(account: IAddAccountModel): Promise<IAccountModel> {
        await PgHelper.connect()
        const user = await PgHelper.query("INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *", [account.name, account.email, account.password])
        if (user.rows.length > 0) {
            return new Promise(resolve => resolve(user.rows[0]))
        }else {
            throw new Error()
        }
    }

    async load(email: string): Promise<IAccountModel | null> {
        const account = await PgHelper.query('SELECT * FROM users WHERE email = $1', [email])
        if(account.rowCount && account.rowCount > 0) {
            return new Promise(resolve => resolve(account.rows[0]))
        }else {
            return new Promise(resolve => resolve(null))
        }
    }

    async update(id: string, token: string): Promise<void> {
        await PgHelper.query("UPDATE users SET token = $2 WHERE id = $1", [id, token])
    }
}