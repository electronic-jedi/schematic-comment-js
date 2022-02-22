// Copyright (c) 2022 Dalitso Sakala
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export interface IConfiguration {
    hBorderChar: string
    vBorderChar: string
    hLineChar: string
    vLineChar: string
}
export class Configuration implements IConfiguration {
    hBorderChar: string
    vBorderChar: string
    hLineChar: string
    vLineChar: string
    constructor(cfg: IConfiguration) {
        let {hBorderChar,vBorderChar,hLineChar,vLineChar } = cfg
        this.vBorderChar = vBorderChar
        this.vLineChar = vLineChar
        this.hBorderChar = hBorderChar
        this.hLineChar = hLineChar
    }
}