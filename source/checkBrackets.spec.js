import checkBrackets from './checkBrackets'

describe('checkBrackets :', () => {
    describe('Должен вернуть true', () => {
        test('когда входная строка с корректной вложенностью скобок', () => {
            expect(checkBrackets('[]()<>')).toBe(true);
            expect(checkBrackets('[(<>)]')).toBe(true);
        })
    })

    describe('Должен вернуть false', () => {
        test('когда входная строка с некорректной вложенностью скобок', () => {
            expect(checkBrackets('[]()<)')).toBe(false);
            expect(checkBrackets('[(<>])')).toBe(false);    
        })

        test('когда входная строка с первой закрывающей скобкой', () => {
            expect(checkBrackets(']()<)')).toBe(false);
        })

        test('когда входная строка с одной скобкой', () => {
            expect(checkBrackets(']')).toBe(false);
        })

        test('когда входная строка содержит нечетное колличество символов', () => {
            expect(checkBrackets('[<]')).toBe(false);
        })

        test('когда входная строка - пустая', () => {
            expect(checkBrackets('')).toBe(false);
        })
    })
    
})