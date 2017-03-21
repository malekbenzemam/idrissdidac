var dirToJson = require('./lib/dirToJson.js');

var file = 'dist/data.json';
var srcDirectory = "Dist/images/products/categories";


// if (module.parent == undefined) {
//     // node dirTree.js ~/foo/bar
//     var util = require('util');
//     var jsonObj = util.inspect(dirTree("Dist/images/Images Publicite"), false, null);
// }


dirToJson.dirToJson(srcDirectory);

// dirToJson.readFile(file, function (err, obj) {
//     obj.children
//         .filter(x => x.type == "folder")
//         .forEach(x => console.log(x));
// });


// jsonfile.writeFile(file, jsonObj, function (err) {
//     console.error(err)
// })
// console.log(jsonObj);