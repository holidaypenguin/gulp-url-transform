/*
* @Author: songshipeng
* @Date:   2017-12-19 18:36:32
* @Email:  songship1221@sina.com
* @Last Modified by:   songshipeng
* @Last Modified time: 2018-01-11 11:26:43
*/


let through = require('through2');
let gutil = require("gulp-util");
let { PluginError } = gutil;
let { dirname, relative, resolve, sep } = require('path');
let { clone, merge } = require('lodash');

let PLUGIN_NAME = 'gulp-file-url';

let logPath = function(path) {
    return gutil.log("" + (gutil.colors.cyan(path)));
};

let logTransform = function(from, to){
    console.log("\t",from, "\n\t\t=>", `"/${to}"`);
};

let defOpts = {
    base: '.',
    keyword: '__uri',
    debug: false
};

module.exports = {
    toRelative(opts){
        return commonReplace(opts, getRelativeFileContent);
    },
    toAbsolute(opts){
        return commonReplace(opts, getAbsoluteFileContent);
        
    },
};


function commonReplace(opts, fileContentFn){
    if (opts == null) {
        opts = {};
    }
    opts = merge(clone(defOpts), opts);
    let rootPath = resolve(process.cwd(), opts.base);

    return through({
        objectMode: true
    }, function(file, enc, callback) {
        if (file.isNull()) {
            this.push(file);
            callback();
            return;
        }
        if (file.isBuffer()) {
            let fileContent = fileContentFn(rootPath, opts, file);

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

/**
 * regExp No.1 /['"]?__uri\s*\(\s*['"]?(\/.*?)['"]?\s*\)['"]?/g
 * regExp No.2 new RegExp("[\'\"]?__uri\\s*\\(\\s*[\'\"]?(\\/.*?)[\'\"]?\\s*\\)[\'\"]?", "g")
 */
function getRelativeFileContent(rootPath, opts, file){
    let {filePath, fileContent} = getParams(file),
        regExp = new RegExp(`['"]?${opts.keyword}\\s*\\(\\s*['"]?(\\/.*?)['"]?\\s*\\)['"]?`, "g");
    
    if(!regExp.test(fileContent)) return fileContent;

    opts.debug && logPath(file.path);

    return fileContent.replace(regExp, function(matched, absPath) {
        let imagePath = resolve(rootPath, "." + absPath);
        let relPath = relative(filePath, imagePath);

        opts.debug && logTransform(absPath, relPath);

        return getReturnPath(relPath, opts);
    });
}

/**
 * regExp No.1 /['"]?__uri\s*\(\s*['"]?([^\/][^data:].*?)['"]?\s*\)['"]?/g
 * regExp No.2 new RegExp("[\'\"]?__uri\\s*\\(\s*[\'\"]?([^\\/][^data:].*?)[\'\"]?\\s*\\)[\'\"]?", "g")
 */
function getAbsoluteFileContent(rootPath, opts, file){
    let {filePath, fileContent} = getParams(file),
        regExp = new RegExp(`['"]?${opts.keyword}\\s*\\(\s*['"]?([^\\/][^data:].*?)['"]?\\s*\\)['"]?`, "g");

    if(!regExp.test(fileContent)) return fileContent;

    opts.debug && logPath(file.path);

    return fileContent.replace(regExp, function(matched, relPath) {
        let fullPath = resolve(filePath, relPath);
        let absPath = relative(rootPath, fullPath).split(sep).join("/");

        opts.debug && logTransform(relPath, absPath);

        return getReturnPath(`/${absPath}`, opts);
    });
}

function getParams(file){
    return {
        filePath: dirname(file.path),
        fileContent: file.contents.toString()
    };
}

function getReturnPath(path, opts){
    switch(opts.keyword){
        case 'url': return `url("${path}")`;
        case 'src': return `src="${path}"`;
        case 'href': return `href="${path}"`;
        default: return `"${path}"`;
    }
}