// Copyright (c) 2022 Dalitso Sakala
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export type TOrientation = 'v' | 'h'

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
}

export class Text implements IGeometry {
    constructor(
        public readonly text: string,
        public readonly position: IPosition,
    ) { }
}

export interface IArrow extends IGeometry {
    size: number
    orientation: TOrientation
}


export enum GeometryTag {
    Space,
    Box,
    Arrow,
    Text
}