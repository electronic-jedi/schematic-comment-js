// Copyright (c) 2022 Dalitso Sakala
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Configuration } from "./cfg";
import { Text, Box, IGeometry } from "./interface/geometry";
import { IGeomIsolatedData, IGeomLine, TBit, TGeomTag } from "./interface/misc";
import { ISPrinter } from "./interface/s-printer";



export function instanceofSuperWithFields(type: any, superFields: string) {
    let isInstance = true
    for (let key of superFields.split(',')) {
        if (!(key in type)) {
            isInstance = false
            break;
        }
    }
    return isInstance
}

/**
 * @internalApi
 * @param character 
 * @param times 
 * @param lineProgress 
 * @returns 
 */
function composeCharsInLine(character: string, times: number = 1) {
    return character.repeat(times)
}


/**
 * Does the proc
 * @internalApi
 * @param arg 
 * @param geometry 
 */
export function generateComment(arg: ISPrinter, geometry: IGeometry[]) {
    const SPACE = ' '
    const BREAK = '\n'
    const { config } = arg
    const { hBorderChar, vBorderChar, hLineChar, vLineChar } = config
    const geomIsolatedLineData: IGeomIsolatedData[] = []

    for (let geom of geometry) {
        let progress = ''
        const vSpaceBefore = geom.position.y
        progress += composeCharsInLine(BREAK, vSpaceBefore)
        if (geom instanceof Box) {
            progress += composeBox(geom, progress)
            geomIsolatedLineData.push({ group: 'box', lines: progress.split(BREAK) })
        }
        if (geom instanceof Text) {
            progress += composeText(geom, progress)
            geomIsolatedLineData.push({ group: 'text', lines: progress.split(BREAK) })
        }
    }



    return runCompositing()

    function runCompositing() {
        const groupLines: IGeomLine[][] = []
        const outputLines: string[][] = []
        for (let completeFigure of geomIsolatedLineData) {
            let index = 0
            for (let line of completeFigure.lines) {
                if (!groupLines[index])
                    groupLines.push([])
                groupLines[index++].push({ group: completeFigure.group, data: line })
            }
        }
        for (let line = 0; line < groupLines.length; line++) {
            let lineCompetitors = groupLines[line]
            lineCompetitors.forEach(({ data, group }) => {
                if (!outputLines[line])
                    outputLines[line] = []
                for (let column = 0; column < data.length; column++) {
                    let newCharacter = data[column]
                    let currentOutputChar = outputLines[line][column]
                    if (currentOutputChar) {
                        if (canOverwriteChar(group, newCharacter, currentOutputChar, config))
                            outputLines[line][column] = newCharacter
                    } else {
                        outputLines[line][column] = newCharacter
                    }
                }
            })
        }
        return outputLines.map(l => l.join('')).join('\n');
    }
    function composeBox(box: Box, progress: string): string {
        let { width, height } = box
        let { x, y } = box.position
        progress += composeCharsInLine(SPACE, x)
        // Horizontal top side
        progress += composeCharsInLine(hBorderChar, width)
        progress += composeCharsInLine(BREAK, 1)
        for (let _y = y; _y <= y + height; _y++) {

            progress += composeCharsInLine(SPACE, x)
            progress += composeCharsInLine(vBorderChar, 1)
            progress += composeCharsInLine(SPACE, width - 2)
            progress += composeCharsInLine(vBorderChar, 1)
            progress += composeCharsInLine(BREAK, 1)
        }
        progress += composeCharsInLine(SPACE, x)
        // Horizontal bottom side
        progress += composeCharsInLine(hBorderChar, width)
        progress += composeCharsInLine(BREAK, 1)
        return progress
    }
    function composeText(text: Text, progress: string): string {
        let { x, y } = text.position
        let chars = text.text
        progress += composeCharsInLine(SPACE, x)
        progress += chars
        progress += composeCharsInLine(BREAK, 1)
        return progress
    }
}

function canOverwriteChar(type: TGeomTag, newChar: string, existingChar: string, cfg: Configuration) {
    if (existingChar == newChar) return false
    switch (type) {
        case 'text':
            return newChar!=' '
        case 'box':
            return existingChar==' '
    }
    return false
}