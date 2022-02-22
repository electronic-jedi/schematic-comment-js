// Copyright (c) 2022 Dalitso Sakala
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Box, Text, SPrinter } from '../index'


new SPrinter(300,400,{config:{vLineChar:'|',vBorderChar:'|',hLineChar:'-',hBorderChar:'-'}})
.draw(new Box(10,10,{x:60,y:7}))
.draw(new Text('This is',{x:57,y:8}))
.draw(new Box(10,10,{x:10,y:1}))
.draw(new Box(90,20,{x:10,y:1}))
.draw(new Text('Hello world',{x:31,y:3}))
.draw(new Box(15,6,{x:30,y:2}))
.draw(new Box(15,6,{x:20,y:8}))

.comment()