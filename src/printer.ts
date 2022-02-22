// Copyright (c) 2022 Dalitso Sakala
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { IConfiguration } from "./cfg";
import { IGeometry } from "./interface/geometry";
import { ISPrinterConfig } from "./interface/s-printer";
import { generateComment } from "./utils";

'Rx10y10(10,40),Tx5y6(Hello),Lx2y4'
export class SPrinter {
    readonly config: IConfiguration
    readonly width: number
    readonly height: number
    private readonly _data: IGeometry[] = []
    constructor(width: number, height: number, extras: ISPrinterConfig) {
        this.width = width
        this.height = height
        this.config = extras.config
    }
    draw(box: IGeometry) {
        this._data.push(box)
        return this
    }
    comment(type: number = SPrinter.C_SINGLE_LINE) {
        let start = ''
        let end = ''
        let newLine = ''
        switch (type) {
            case SPrinter.C_MULTI_LINE:
                start = '/**'
                end = '*/'
                newLine = '* '
                break
            case SPrinter.C_SINGLE_LINE:
                start = end = newLine = '//'
                break
            case SPrinter.BASH:
                start = end = newLine = '#'
                break
        }
        let content = generateComment(this, this._data).replace(/\n/g, `\n${newLine}`)
        content = start + content + end
        console.log(content)
    }
    /**
     * Comment with the characters `//`
     */
    static C_SINGLE_LINE = 0
    /**
     * Comment with the characters `/** *`
     */
    static C_MULTI_LINE = 1
    /**
     * Comment with the characters `#`
     */
    static BASH = 2
}