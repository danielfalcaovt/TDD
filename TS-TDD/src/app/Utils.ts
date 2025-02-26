export function toUppercase(text: string) {
    return text.toUpperCase()
}

export type StringInfo = {
    lowerCase: string,
    upperCase: string,
    characters: string[],
    length: number,
    extraInfo?: Object
}

export class StringUtils {
    getStringInfo(text: string) {
        if (!text) {
            throw new Error('missing string param')
        }
        return {
            lowerCase: text.toLowerCase(),
            upperCase: text.toUpperCase(),
            characters: Array.from(text),
            length: text.length,
            extraInfo: {}
        }
    }
}