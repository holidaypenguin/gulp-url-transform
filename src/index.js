let through = require('through2');
let gutil = require("gulp-util");
let { PluginError } = gutil;
let { dirname, relative, resolve, sep } = require('path');
let { clone, merge } = require('lodash');

let PLUGIN_NAME = 'gulp-file-url';

let log = function(path) {
    return gutil.log("" + (gutil.colors.cyan(path)));
};

let defOpts = {
    base: '.',
    key: '__uri'
};

module.exports = {
    toRelative(opts){
        if (opts == null) {
            opts = {};
        }
        opts = merge(clone(defOpts), opts);
        let rootPath = resolve(process.cwd(), opts.base);
        return relativeReplace(rootPath, opts);
    },
    toAbsolute(opts){
        if (opts == null) {
            opts = {};
        }
        opts = merge(clone(defOpts), opts);
        let rootPath = resolve(process.cwd(), opts.base);
        return absoluteReplace(rootPath, opts);
    },
};



function  relativeReplace(rootPath, opts){
    return through({
        objectMode: true
    }, function(file, enc, callback) {
        if (file.isNull()) {
            this.push(file);
            callback();
            return;
        }
        if (file.isBuffer()) {
            let filePath = dirname(file.path);
            let fileContent = file.contents.toString();
            fileContent = fileContent.replace(/['"]?__uri\s*\(\s*['"]?(\/.*?)['"]?\s*\)['"]?/g, function(matched, absPath) {
                let imagePath = resolve(rootPath, "." + absPath);
                let relPath = relative(filePath, imagePath);
                return "url(\"" + relPath + "\")";
            });
            file.contents = new Buffer(fileContent);
            this.push(file);
            callback();
            return;
        }
        if (file.isStream()) {
            throw new PluginError(PLUGIN_NAME, 'Stream is not supported');
        }
    });
}
function  absoluteReplace(rootPath, opts){
    return through({
        objectMode: true
    }, function(file, enc, callback) {
        if (file.isNull()) {
            this.push(file);
            callback();
            return;
        }
        if (file.isBuffer()) {
            let fileContent = absoluteReplaceDoit(rootPath, opts, file);

            file.contents = new Buffer(fileContent);
            this.push(file);
            callback();
            return;
        }
        if (file.isStream()) {
            throw new PluginError(PLUGIN_NAME, 'Stream is not supported');
        }
    });
}

function absoluteReplaceDoit(rootPath, opts, file){
    let filePath = dirname(file.path),
        fileContent = file.contents.toString(),
        regExp = /['"]?__uri\s*\(\s*['"]?([^\/][^data:].*?)['"]?\s*\)['"]?/g;
        // regExp = new RegExp("['\"]?__uri\s*\(\s*['\"]?([^\/][^data:].*?)['\"]?\s*\)['\"]?", "g");

    if(!regExp.test(fileContent)) return fileContent;

    opts.debug && log(file.path);

    return fileContent.replace(regExp, function(matched, relPath) {
        let imagePath = resolve(filePath, relPath);
        let absPath = relative(rootPath, imagePath);

        opts.debug && console.log("\t",relPath, "\n\t\t=>", sep + absPath);
        console.log("\t\timagePath=",imagePath);
        console.log("\t\trootPath=",rootPath);

        return `"${sep}${absPath}"`;
    });
}

function  absoluteReplace_back(rootPath, opts){
    return through({
        objectMode: true
    }, function(file, enc, callback) {
        if (file.isNull()) {
            this.push(file);
            callback();
            return;
        }
        if (file.isBuffer()) {
            let filePath = file.base;
            let fileContent = file.contents.toString();
            fileContent = fileContent.replace(/['"]?__uri\s*\(\s*['"]?([^\/][^data:].*?)['"]?\s*\)['"]?/g, function(matched, relPath) {
                console.info("absoluteReplace---------------------------------------------------0");

                let imagePath = resolve(filePath, relPath);
                let absPath = relative(rootPath, imagePath);

                console.log("==============================================");
                console.log("----filePath=", file.path);
                console.log("----relPath=", relPath);
                console.log("----imagePath=", imagePath);
                console.log("----absPath=", absPath);
                console.log("==============================================");
                return "\"/" + absPath + "\"";
            });
            file.contents = new Buffer(fileContent);
            this.push(file);
            callback();
            return;
        }
        if (file.isStream()) {
            throw new PluginError(PLUGIN_NAME, 'Stream is not supported');
        }
    });
}