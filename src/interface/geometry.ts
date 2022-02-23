// Copyright (c) 2022 Dalitso Sakala
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export type TDirection = 'l' | 'r' | 'u' | 'd'

export interface IPosition {
    x: number
    y: number
}

export interface IGeometry {
    position: IPosition
}

export interface ISpace extends IPosition {
    width: number
}

/**Construct a box*/
export class Box implements IGeometry {
    constructor(
        public readonly width: number,
        public readonly height: number,
        public readonly position: IPosition
    ) { }
    /**The character to use when rendering a horizontal border */
    static hBorderChar = '*'
    /**The character to use when rendering a vertical border */
    static vBorderChar = '*'
}
/**Construct a text characters */
export class Line implements IGeometry {
    constructor(
        public size: number,
        public direction: TDirection,
        public hasHead: boolean,
        public position: IPosition
    ) { }
    /**The character to use when rendering a horizontal line */
    static hLineChar = '-'
    /**The character to use when rendering a vertical line */
    static vLineChar = '.'
    /**The character to use when rendering an arowhead for an arrow going left*/
    static leftLineChar = '<'
    /**The character to use when rendering an arowhead for an arrow going right*/
    static rightLineChar = '>'
    /**The character to use when rendering an arowhead for an arrow going up*/
    static upLineChar = '^'
    /**The character to use when rendering an arowhead for an arrow going down*/
    static downLineChar = 'v'
}

export class Text implements IGeometry {
    constructor(
        public readonly text: string,
        public readonly position: IPosition,
    ) { }
}


