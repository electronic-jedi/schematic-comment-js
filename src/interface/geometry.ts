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

export class Box implements IGeometry {
    constructor(
        public readonly width: number,
        public readonly height: number,
        public readonly position: IPosition
    ) { }
    static hBorderChar='*'
    static vBorderChar='*'
}

export class Line implements IGeometry {
    constructor(
        public size: number,
        public direction: TDirection,
        public hasHead: boolean,
        public position: IPosition
    ) { }
    static hLineChar = '-'
    static vLineChar = '.'
    static leftLineChar = '<'
    static rightLineChar = '>'
    static upLineChar = '^'
    static downLineChar = 'v'
}

export class Text implements IGeometry {
    constructor(
        public readonly text: string,
        public readonly position: IPosition,
    ) { }
}


