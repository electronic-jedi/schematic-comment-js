// Copyright (c) 2022 Dalitso Sakala
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { IGeometry } from "./geometry";
import { generateComment } from "../utils";

/**
 * Create diagrams with comments to pase in code.
 */
export class SchematicCommentBuilder {
    private readonly _data: IGeometry[] = []
    draw(box: IGeometry) {
        this._data.push(box)
        return this
    }
    comment(type: number = SchematicCommentBuilder.C_SINGLE_LINE) {
        let start = ''
        let end = ''
        let newLine = ''
        switch (type) {
            case SchematicCommentBuilder.C_MULTI_LINE:
                start = '/**\n'
                end = '*/'
                newLine = ''
                break
            case SchematicCommentBuilder.C_SINGLE_LINE:
                newLine = '//'
                start = '//'
                break
            case SchematicCommentBuilder.HTML:
                start = '<!--\n'
                end = '-->'
                break
            case SchematicCommentBuilder.BASH:
                newLine = '#'
                break
        }
        let content = generateComment(this._data).replace(/\n/g, `\n${newLine}`)
        content = start + content + end
        return content
    }
    /**
     * Comment delimited by the characters characters `//`
     */
    static C_SINGLE_LINE = 0
    /**
     * Comment delimited by the characters characters `/** *`
     */
    static C_MULTI_LINE = 1
    /**
     * Comment delimited by the characters characters `#`
     */
    static BASH = 2
    /**
     * Comment delimited by the characters characters `<!-- -->`
     */
    static HTML = 3
}