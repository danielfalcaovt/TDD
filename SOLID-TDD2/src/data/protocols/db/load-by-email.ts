import { IAccountModel } from "../../usecases/add-account/db-add-account-protocols";

export interface ILoadByEmail {
    load(email: string): Promise<IAccountModel | null>
}