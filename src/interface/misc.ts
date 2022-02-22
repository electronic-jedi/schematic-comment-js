// Copyright (c) 2022 Dalitso Sakala
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export type TBit=0|1
export type TGeomTag='box'|'line'|'text'

export interface IGeomLine{
    group:TGeomTag
    data:string
}
export interface IGeomIsolatedData{
    group:TGeomTag
    lines:string[]
}


