import { Authorizer } from "../../../app/server_app/auth/Authorizer"
import { ReservationsDataAccess } from "../../../app/server_app/data/ReservationsDataAccess"
import { Server } from "../../../app/server_app/server/Server"

jest.mock("../../../app/server_app/handlers/ReservationsHandler")
jest.mock("../../../app/server_app/handlers/RegisterHandler")
jest.mock("../../../app/server_app/handlers/LoginHandler")
jest.mock("../../../app/server_app/auth/Authorizer")
jest.mock("../../../app/server_app/data/ReservationsDataAccess")

const requestMock = {
    url: '',
    headers: {
        'user-agent': 'jest'
    }
}

const responseMock = {
    end: jest.fn(),
    writeHead: jest.fn()
}

const serverMock = {
    listen: jest.fn(),
    close: jest.fn()
}

jest.mock('http', () => ({
    CreateServer: (cb: Function) => {
        cb(requestMock, responseMock)
        return {

        }
    }
}))

describe('Server test suite', () => {
    let sut: Server
    beforeEach(() => {
        sut = new Server()
        expect(Authorizer).toHaveBeenCalledTimes(1)
        expect(ReservationsDataAccess).toHaveBeenCalledTimes(1)
    })

    it('should be work', () => {
        const server = sut.startServer()
    })
})