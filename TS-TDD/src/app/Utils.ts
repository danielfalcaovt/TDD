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

export function getStringInfo(text: string): StringInfo {
    return {
        lowerCase: text.toLowerCase(),
        upperCase: text.toUpperCase(),
        characters: Array.from(text),
        length: text.length,
        extraInfo: {}
    }
}