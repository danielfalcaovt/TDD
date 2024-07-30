import { IAddAccountModel } from "../../domain/models/add-account";
import { IAccountModel } from "../../domain/protocols/account";

export interface IAddAccountRepository {
    add (account: IAddAccountModel): Promise<IAccountModel>
}