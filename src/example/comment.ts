// Copyright (c) 2022 Dalitso Sakala
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Box, Text, SchematicCommentBuilder as SchematicCommentBuilder, Line } from '../index'

new SchematicCommentBuilder()
    .draw(new Box(20, 10, { x: 3, y: 0 }))
    .draw(new Text('Schematic comment', { x: 5, y: 3 }))


    .draw(new Line(6, 'r', true, { x: 23, y: 2 }))


    .draw(new Box(21, 5, { x: 30, y: 0 }))
    .draw(new Text('says "Hello world!"', { x: 31, y: 2 }))


    .draw(new Line(27, 'r', true, { x: 23, y: 5 }))


    
    .draw(new Box(21, 3, { x: 51, y: 4 }))
    .draw(new Text('Is coming soon!', { x: 54, y: 5}))



    .comment(SchematicCommentBuilder.C_SINGLE_LINE)