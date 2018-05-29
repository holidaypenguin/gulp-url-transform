/*
* @Author: songshipeng
* @Date:   2018-05-28 17:07:36
* @Email:  songship1221@rongyi.com
* @Last Modified by:   songshipeng
* @Last Modified time: 2018-05-29 13:51:07
*/


module.exports = {
    getRelativeFileContent: getRelativeFileContent,
    getRelativeRegExp: getRelativeRegExp,
    getAbsoluteFileContent: getAbsoluteFileContent,
    getAbsoluteRegExp: getAbsoluteRegExp
};


let gutil = require("gulp-util");
let { dirname, relative, resolve, sep } = require('path');


function getRelativeFileContent(rootPath, opts, file, regExp){
    let {filePath, fileContent} = getParams(file);
    
    if(!regExp.test(fileContent)) return fileContent;

    opts.debug && logPath(file.path);

    return fileContent.replace(regExp, function(matched, absPath) {

        absPath = opts.before(absPath, file);

        let imagePath = resolve(rootPath, "." + absPath);
        let relPath = relative(filePath, imagePath);

        relPath = opts.after(relPath, file);

        opts.debug && logTransform(absPath, relPath);

        return getReturnPath(relPath, opts);
    });
}

/**
 * regExp No.1 /['"]?__uri\s*\(\s*['"]?(\/.*?)['"]?\s*\)['"]?/g
 * regExp No.2 new RegExp("[\'\"]?__uri\\s*\\(\\s*[\'\"]?(\\/.*?)[\'\"]?\\s*\\)[\'\"]?", "g")
 */
function getRelativeRegExp(opts){
    return new RegExp(`['"]?\\s*${opts.keyword}\\s*\\(\\s*['"]?(\\/.*?)['"]?\\s*\\)\\s*['"]?`, "g");
}


function getAbsoluteFileContent(rootPath, opts, file, regExp){
    let {filePath, fileContent} = getParams(file);

    if(!regExp.test(fileContent)) return fileContent;

    opts.debug && logPath(file.path);

    return fileContent.replace(regExp, function(matched, relPath) {

        relPath = opts.before(relPath, file);

        let fullPath = resolve(filePath, relPath);
        let absPath = relative(rootPath, fullPath).split(sep).join("/");

        absPath = `/${absPath}`;
        absPath = opts.after(absPath, file);

        opts.debug && logTransform(relPath, absPath);

        return getReturnPath(`${absPath}`, opts);
    });
}

/**
 * regExp No.1 /['"]?__uri\s*\(\s*['"]?([^\/][^data:].*?)['"]?\s*\)['"]?/g
 * regExp No.2 new RegExp("[\'\"]?__uri\\s*\\(\s*[\'\"]?([^\\/][^data:].*?)[\'\"]?\\s*\\)[\'\"]?", "g")
 */
function getAbsoluteRegExp(opts){
    return new RegExp(`['"]?\\s*${opts.keyword}\\s*\\(\\s*['"]?([^\\/][^data:].*?)['"]?\\s*\\)\\s*['"]?`, "g");
}

function getParams(file){
    return {
        filePath: dirname(file.path),
        fileContent: file.contents.toString()
    };
}

function logPath(path) {
    return gutil.log(gutil.colors.cyan(path));
}

function logTransform(from, to){
    console.log("\t",from, "\n\t\t=>", `"${to}"`);
}

function getReturnPath(path, opts){
    switch(opts.keyword){
        case 'url': return `url("${path}")`;
        case 'src': return `src="${path}"`;
        case 'href': return `href="${path}"`;
        default: return `"${path}"`;
    }
}
