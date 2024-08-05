import { IAddAccountModel } from "./add-account";
import { IAccountModel } from "../../../domain/models/account";

export interface IAddAccountRepository {
    add (account: IAddAccountModel): Promise<IAccountModel>
}