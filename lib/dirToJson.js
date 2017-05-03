var fs = require('fs'),
    path = require('path'),
    jsonfile = require('jsonfile');


function dirTree(filename, id) {
    categoryId = (id || 0) + 1;
    var stats = fs.lstatSync(filename),
        info = {

            name: path.basename(filename),
            discription: "",
            urlname: path.basename(filename, path.extname(filename)).replace(/ /g, "_").toUpperCase(),
            id: categoryId
        };

    if (stats.isDirectory()) {
        info.type = "folder";

        info.children = fs.readdirSync(filename)
            .map(function (child, index) {
                return dirTree(filename + '/' + child, index);
            });
    } else {
        // Assuming it's a file. In real life it could be a symlink or
        // something else!
        info.path = filename;
        info.ref = "";
        info.type = "file";

    }

    return info;
}


// convert a directory structure to json file
function dirToJson(srcDir, fileName) {
    srcDir = srcDir || './';
    fileName = fileName || 'data.json';
    jsonObj = dirTree(srcDir);
    console.log(srcDir);
    console.log(fileName);
    jsonfile.writeFile(fileName, jsonObj, function (err) {
        console.error(err)
    })

}
function readFile(file, cb) {
    jsonfile.readFile(file, cb);
}

module.exports = {
    dirToJson: dirToJson,
    readFile: readFile
};