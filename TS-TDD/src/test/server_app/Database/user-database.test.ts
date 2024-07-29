import { DataBase } from "../../../app/server_app/data/DataBase"
import { UserCredentialsDataAccess } from "../../../app/server_app/data/UserCredentialsDataAccess"
import { Account } from "../../../app/server_app/model/AuthModel"


const insertFunc = jest.fn()
const getByFunc = jest.fn()
jest.mock("../../../app/server_app/data/DataBase", () => {
    return {
        DataBase: jest.fn().mockImplementation(() => {
            return {
                insert: insertFunc,
                getBy: getByFunc
            }
        })
    }
})

const makeFakeAccount = (): Account => {
    return {
        id: 'any_id',
        userName: 'any_username',
        password: 'any_password'
    }
}

describe('UserCredentialsDataAccess test', () => {
    let sut: UserCredentialsDataAccess

    beforeEach(async () => {
        sut = new UserCredentialsDataAccess()
        expect(DataBase).toHaveBeenCalledTimes(1)
    })
    afterEach(async () => {
        jest.clearAllMocks()
    })
    test('Should add the user and return correct id', async () => {
        insertFunc.mockResolvedValue('any_id')
        const actual = await sut.addUser(makeFakeAccount())
        expect(actual).toBe('any_id')
    })
    test('Should call Insert with correct values', async () => {
        await sut.addUser(makeFakeAccount())
        expect(insertFunc).toHaveBeenCalledWith(makeFakeAccount())
    })
    test('Should return an user on getBy succeed', async () => {
        insertFunc.mockResolvedValue('any_id')
        await sut.addUser(makeFakeAccount())
        const actual = await sut.getUserById('any_id')
        expect(actual).toEqual(makeFakeAccount())
    })
})