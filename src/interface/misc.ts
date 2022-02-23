// Copyright (c) 2022 Dalitso Sakala
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export type TCharacterType = 'box' | 'line' | 'text'
/**Characters in aline */
export interface IFormatedLineCharacters {
    group: TCharacterType
    data: string
}
/** */
export interface IIsolatedLineCharacters {
    group: TCharacterType
    lines: string[]
}


