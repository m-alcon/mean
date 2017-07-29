const   fs = require("fs"),
        extension = ".seed.js"
 
fs.readdirSync(__dirname + '/').forEach( file => {
    if (file === 'index.js') return
    exports[ file.replace(extension, "") ] = require('./' + file)
})