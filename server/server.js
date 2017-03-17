const data = require('../data.json');
var categories = data.children;
// console.log(categories);    

result = dirTree(data);
console.log(result.children);

// result.children.
//     forEach(x => console.log(x.children));

function dirTree(filename) {
    if (filename.type == "folder") {
        var info = {
            path: filename.path,
            name: filename.name,
            type: filename.type
        };

        info.children = filename.children
            .filter(x => x.type == 'folder')
            .map(function (child) {
                return dirTree(child);
            });

        return info;
    }

}



