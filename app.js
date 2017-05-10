var dirToJson = require('./lib/dirToJson.js');

var file = 'dist/api/data.json';
// Source directory
var srcDirectory = "dist/images/products/categories";


// if (module.parent == undefined) {
//     // node dirTree.js ~/foo/bar
//     var util = require('util');
//     var jsonObj = util.inspect(dirTree("dist/images/Images Publicite"), false, null);
// }


dirToJson.dirToJson(srcDirectory,file);

// dirToJson.readFile(file, function (err, obj) {
//     obj.children
//         .filter(x => x.type == "folder")
//         .forEach(x => console.log(x));
// });


// jsonfile.writeFile(file, jsonObj, function (err) {
//     console.error(err)
// })
// console.log(jsonObj);