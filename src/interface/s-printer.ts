// Copyright (c) 2022 Dalitso Sakala
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { IConfiguration } from "../cfg";

export interface ISPrinterConfig{
    config:IConfiguration
}

export interface ISPrinter{
    readonly config: IConfiguration
    readonly width:number
    readonly height:number
}