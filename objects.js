//Object Literals
let empty = {};                             // An object with no properties
let point = {x:0, y:0};                     // Two numeric properties
let p2 = {x: point.x, y: point.y+1};        // More complex values
let book = {                
    "main title": "Learning JS",            // These property names include spaces,
    "sub-title": "A Practical Example",     // and hyphens, so use string literals.
    for: "everyone",                        // for is reserved, but no quotes.
    author: {                               // The value of this property is
        firstname: "Tavishi",               // itself an object.
        surname: "Sharma"
    }
};            