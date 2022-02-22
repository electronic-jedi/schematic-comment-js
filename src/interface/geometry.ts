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
    width: number
    height: number
    position: IPosition
    constructor(
        width: number,
        height: number,
        position: IPosition,
        ) {
        this.height = height
        this.width = width; 
        this.position = position
    }
}

export interface IArrow extends IGeometry {
    size: number
    orientation: TOrientation
}

export interface IText extends IGeometry {
    value: string
}

export enum GeometryTag {
    Space,
    Box,
    Arrow,
    Text
}