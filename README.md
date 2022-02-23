<!--
 Copyright (c) 2022 Dalitso Sakala
 
 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->

# schematic-comment-js

A library for writing comments with diagram detail


## Example
Here is an example using `v1.0.0-beta`.
```ts 
// An example in typescript
import { Box, Text, SchematicCommentBuilder, Line } from '../index'

// conditionally include escape characters according
// to preferred language.
// SchematicCommentBuilder.setIncludeCommentEscapes(false)
// Build the schematic.
// Box.hBorderChar='-'
let characters = new SchematicCommentBuilder()
    // box to contain text 'Schematic comment'
    .draw(new Box(20, 10, { x: 3, y: 0 }))
    .draw(new Text('Schematic comment', { x: 5, y: 3 }))
    // Horizontal line going 'right'
    .draw(new Line(6, 'r', true, { x: 23, y: 2 }))
    // Box containing text 'says "Hello world!"'
    .draw(new Box(21, 5, { x: 30, y: 0 }))
    .draw(new Text('says "Hello world!"', { x: 31, y: 2 }))
    // Horizontal line going 'right'
    .draw(new Line(27, 'r', true, { x: 23, y: 5 }))
    // Box containing text 's coming soon!'
    .draw(new Box(21, 3, { x: 51, y: 4 }))
    .draw(new Text('Is coming soon!', { x: 54, y: 5 }))
    // finally 'compile' the characters
    .comment(SchematicCommentBuilder.C_MULTI_LINE)
// `characters` now contains the string of characters formatted
// with the desired figures
console.log(characters)
```

Output:

```typescript
/**
   ********************       *********************
   *                  *       *                   *
   *                  *       *                   *
   *                  *       *                   *
   *                  *-----> *says "Hello world!"*
   *                  *       *                   *
   * Schematic comment*       *                   *
   *                  *       *********************
   *                  *                            *********************
   *                  *                            *                   *
   *                  *--------------------------> *  Is coming soon!  *
   *                  *                            *                   *
   ********************                            *                   *
                                                   *********************
*/
```

# Contribute
You can make a pull request to contribute.