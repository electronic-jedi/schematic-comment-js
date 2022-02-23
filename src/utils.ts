// Copyright (c) 2022 Dalitso Sakala
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

//
//
//          ------------------------------------------------------------------------------------------
//          .        .                                                                               .
//          .        .          ---------------                                                      .
//          .        .          .             .                                                      .
//          .        .          .Hello world  .                                                      .
//          .        .          .             .                                                      .
//          .        .          .             .================== "                                  .
//          .        .          .             .                   "                                  .
//          .        .          .             .                   "                                  .
//          .        .          .             .                   "                                  .
//          .        .          ---------------                   "                                  .
//          .        .                                            v                                  .
//          .---------                                        ----------                             .
//          .                                                 .        .                             .
//          .         ---------------                          This is .                             .
//          .         .             .                         .        .                             .
//                    .             .                         .        .                             .
//          .         .             .                         .        .                             .
//          .         .  A detailed .<======================= .        .                             .
//          .         .             .                         .        .                             .
//          .         .  comment    .                         .        .                             .
//          .         .             .                         .        .                             .
//          ------------------------------------------------------------------------------------------
//                                                            .        .
//                                                            ----------
////
import { Text, Box, IGeometry, Line } from "./interface/geometry";
import { IGeomIsolatedData, IGeomLine, TGeomTag } from "./interface/misc";



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
export function generateComment(geometry: IGeometry[]) {
    const SPACE = ' '
    const BREAK = '\n'
    const geomIsolatedLineData: IGeomIsolatedData[] = []

    for (let geom of geometry) {
        let progress = ''
        const vSpaceBefore = geom.position.y
        progress += composeCharsInLine(BREAK, vSpaceBefore)
        if (geom instanceof Box) {
            progress += composeBox(geom, progress)
            geomIsolatedLineData.push({ group: 'box', lines: progress.split(BREAK) })
        }
        else if (geom instanceof Text) {
            progress += composeText(geom, progress)
            geomIsolatedLineData.push({ group: 'text', lines: progress.split(BREAK) })
        }
        else if (geom instanceof Line) {
            progress += composeLine(geom, progress)
            geomIsolatedLineData.push({ group: 'line', lines: progress.split(BREAK) })
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
                        if (canOverwriteChar(group, newCharacter, currentOutputChar))
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
        progress += composeCharsInLine(Box.hBorderChar, width)
        progress += composeCharsInLine(BREAK, 1)
        for (let _y = y; _y <= y + height; _y++) {
            progress += composeCharsInLine(SPACE, x)
            progress += composeCharsInLine(Box.vBorderChar, 1)
            progress += composeCharsInLine(SPACE, width - 2)
            progress += composeCharsInLine(Box.vBorderChar, 1)
            progress += composeCharsInLine(BREAK, 1)
        }
        progress += composeCharsInLine(SPACE, x)
        // Horizontal bottom side
        progress += composeCharsInLine(Box.hBorderChar, width)
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
    function composeLine(line: Line, progress: string): string {
        let { x, y } = line.position
        let { size, direction, hasHead } = line
        if (['l', 'r'].includes(direction)) {
            progress += composeCharsInLine(SPACE, x)
            if (direction == 'l' && hasHead)
                progress += Line.leftLineChar
            progress += composeCharsInLine(Line.hLineChar, size - 1)
            if (direction == 'r' && hasHead)
                progress += Line.rightLineChar
            progress += composeCharsInLine(BREAK, 1)
        }
        else if (['u', 'd'].includes(direction)) {
            if (direction == 'u' && hasHead) {
                progress += composeCharsInLine(SPACE, x)
                progress += Line.upLineChar
                progress += composeCharsInLine(BREAK, 1)
            }
            for (let _y = y; _y <= y + size - 2; _y++) {
                progress += composeCharsInLine(SPACE, x)
                progress += composeCharsInLine(Line.vLineChar, 1)
                progress += composeCharsInLine(BREAK, 1)
            }
            if (direction == 'd' && hasHead) {
                progress += composeCharsInLine(SPACE, x)
                progress += Line.downLineChar
            }
            progress += composeCharsInLine(BREAK, 1)
        }
        return progress
    }
}

function canOverwriteChar(type: TGeomTag, newChar: string, existingChar: string) {
    if (existingChar == newChar) return false
    switch (type) {
        case 'text':
            return newChar != ' '
        case 'box':
            return newChar != ' '
        case 'line':
            return newChar != ' '
    }
    return false
}