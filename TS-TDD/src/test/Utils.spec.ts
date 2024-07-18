import { getStringInfo, getStringInfo as sut } from "../app/Utils"

describe('Utils', () => {
    test('uppercase should return uppercase text', () => {
        const request = 'random_text'
        const actual = sut(request)
        const expected = request.toUpperCase()
        expect(actual.upperCase).toBe(expected)
    })
})