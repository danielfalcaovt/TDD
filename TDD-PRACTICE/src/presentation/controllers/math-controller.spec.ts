const makeSut = (): MathController => {
    const sut = new MathController()
    return sut
}

describe('MathController', () => {
    it('Should call calculate with correct values', () => {
        const sut = makeSut()
        const mathSpy = jest.spyOn(sut, 'calculate')
        sut.calculate(1, 2)
        expect(mathSpy).toHaveBeenCalledWith(1, 2)
    })
})