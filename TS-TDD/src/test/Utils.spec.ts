import { getStringInfo as sut, toUppercase, type StringInfo } from "../app/Utils"

describe('Utils', () => {
    describe('ToUppercase Examples', () => {
        test.each([
            {request: 'any_name', expected: 'ANY_NAME'},
            {request: 'any_value', expected: 'ANY_VALUE'}
        ])('$request should be $expected', ({request, expected}) => {
            const actual = toUppercase(request)
            expect(actual).toBe(expected)
        })
    })

    describe('getStringInfo for random_text should', () => {
        test('return uppercase', () => {
            const request = 'random_text'
            const actual = sut(request)
            const expected = request.toUpperCase()
            expect(actual.upperCase).toBe(expected)
        })
        test('return lowercase', () => {
            const request = 'random_text'
            const actual = sut(request)
            const expected = request.toLowerCase()
            expect(actual.lowerCase).toBe(expected)
        })
        test('return right length', () => {
            const request = 'random_text'
            const actual = sut(request)
            const expected = request.length
            expect(actual.length).toBe(expected)    
        })
        test('return characters', () => {
            const request = 'random_text'
            const actual = sut(request)
            const expected = Array.from(request)
            expect(actual.characters).toEqual(
                expect.arrayContaining(expected)
            )
        })
        test('return defined extra info', () => {
            const request = 'random_text'
            const actual = sut(request)
            expect(actual.extraInfo).toBeTruthy()
        })
    })
})