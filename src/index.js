/*
* @Author: songshipeng
* @Date:   2017-12-19 18:36:32
* @Email:  songship1221@sina.com
* @Last Modified by:   songshipeng
* @Last Modified time: 2018-05-29 11:03:50
*/


let through = require('through2');
let { PluginError } = require("gulp-util");
let { resolve } = require('path');
let { clone, merge } = require('lodash');

let { getRelativeFileContent, getAbsoluteFileContent, getRelativeRegExp, getAbsoluteRegExp } = require('./util');

let PLUGIN_NAME = 'gulp-file-url';


let defOpts = {
    base: '.',
    keyword: '__uri',
    debug: false,
    before: path => path,
    after: path => path
};

module.exports = {
    toRelative(opts){
        return commonReplace(opts, getRelativeFileContent, getRelativeRegExp);
    },
    toAbsolute(opts){
        return commonReplace(opts, getAbsoluteFileContent, getAbsoluteRegExp);
        
    },
};


function commonReplace(opts, fileContentFn, regExpFn){
    if (opts == null) {
        opts = {};
    }

    if(opts.before != undefined && typeof opts.before !== 'function'){
        opts.before = undefined;
    }

    if(opts.after != undefined && typeof opts.after !== 'function'){
        opts.after = undefined;
    }

    opts = merge(clone(defOpts), opts);
    let rootPath = resolve(process.cwd(), opts.base);
    let regExp = regExpFn(opts);

    return through({
        objectMode: true
    }, function(file, enc, callback) {
        if (file.isNull()) {
            this.push(file);
            callback();
            return;
        }
        if (file.isBuffer()) {
            let fileContent = fileContentFn(rootPath, opts, file, regExp);

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