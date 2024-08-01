export interface AuthenticationModel {
    email: string
    password: string
}

export interface IAuthentication {
    authenticate(account: AuthenticationModel): Promise<string | null>
}