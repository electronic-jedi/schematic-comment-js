// Copyright (c) 2022 Dalitso Sakala
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { IGeometry } from "./geometry";
import { generateComment } from "../utils";

/**
 * Create diagrams with comments (or not) to pase in code.
 */
export class SchematicCommentBuilder {
    private readonly _data: IGeometry[] = []
    /**
     * Appends a new set of characters you wish to add to the comment string.
     * The return type can be used to include more characters.
     * @param box An instance that implements `IGeometry` to generate characters for.
     * @returns 
     */
    draw(box: IGeometry) {
        this._data.push(box)
        return this
    }
    /**
     * 
     * @param type  The comment type you prefere according to delimit the
     * schematic comments. This is ignored if call to the static method
     * `setIncludeCommentEscapes` had a falsy parameter.
     * @returns The string of characters that can be pasted to a source file.
     */
    comment(type: number = SchematicCommentBuilder.C_SINGLE_LINE) {
        let start = ''
        let end = ''
        let newLine = ''
        if (SchematicCommentBuilder._includeCommentEscapes)
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
                case SchematicCommentBuilder.DART:
                    newLine = '///'
                    start = '///'
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
     * Comment delimited by the characters characters `/** * /`
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
    /**
     * Comment delimited by the characters characters `///`
     */
    static DART = 4
    /** see `setIncludeCommentEscapes` */
    private static _includeCommentEscapes = true

    /**
     * Prefer to include comment escapes or not.
     * THis must be called before an instance call to `compile`
     * is made if you intnd to customize behaviour.
     * @param include 
     */
    static setIncludeCommentEscapes(include: boolean = true) {
        this._includeCommentEscapes = include
    }
}