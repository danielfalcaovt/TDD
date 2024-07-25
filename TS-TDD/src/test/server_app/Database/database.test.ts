import { DataBase } from "../../../app/server_app/data/DataBase"
import * as IdGenerator from "../../../app/server_app/data/IdGenerator"

type IdType = {
    id: string,
    name: string,
    color: string
}


describe("Database test suite", () => {
    let sut: DataBase<IdType>

    const fakeId = 'any_id'

    beforeEach(() => {
        sut = new DataBase<IdType>()
        jest.spyOn(IdGenerator, 'generateRandomId').mockReturnValue(fakeId)
    })

    it('Should return an id on insert success', async () => {
        const request = {
            id: fakeId,
            name: 'any_name',
            color: 'any_color'
        }
        const actual = await sut.insert(request)
        expect(actual).toBe(fakeId)
    })
    it('Should throw if insert throws', async () => {
        const request = {
            id: fakeId,
            name: 'any_name',
            color: 'any_color'
        }
        jest.spyOn(sut, 'insert').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        const promise = sut.insert(request)
        expect(promise).rejects.toThrow()
    })
    it('Should not return on getBy fail', async () => {
        const account = await sut.getBy('id', 'any_value')
        expect(account).toBeFalsy()
    })
    it('Should return an account on getBy success', async () => {
        await sut.insert({
            id: fakeId,
            name: 'any_name',
            color: 'any_color'
        })
        const account = await sut.getBy('id', fakeId)
        expect(account).toBeTruthy()
        expect(account.id).toBe(fakeId)
    })
    it('Should throw if getBy throws', async () => {
        jest.spyOn(sut, 'getBy').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        const account = sut.getBy('id', fakeId)
        expect(account).rejects.toThrow()
    })
    it('Should return all accounts on getAllBy success', async () => {
        await sut.insert({
            id: fakeId,
            name: 'any_name',
            color: 'any_color'
        })
        await sut.insert({
            id: 'second_id',
            name: 'generic_name',
            color: 'any_color'
        })
        const results = await sut.findAllBy('name', 'generic_name')
        expect(results[0].name).toBe('generic_name')
    })
    it('Should not return if getAllBy fails', async () => {
        const result = await sut.findAllBy('name', 'any_name')
        expect(result[0]).toBeFalsy()
    })
})