const fs = require('fs'); // https://www.npmjs.com/package/pn
const path = require('path');

const titleDirPath = 'images/';

const ImageUtil = (module.exports = {});

const mkdirs = function (dirpath, mode, callback) {
    fs.exists(dirpath, function (exists) {
        if (exists) {
            callback(dirpath);
        } else {
            //尝试创建父目录，然后再创建当前目录
            mkdirs(path.dirname(dirpath), mode, function () {
                fs.mkdir(dirpath, mode, callback);
            });
        }
    });
};

ImageUtil.saveImage = function (binaryData, coords) {
    const dir = titleDirPath + '/' + coords.z + '/' + coords.x;
    mkdirs(dir, 0777, function (err) {
        const _path =
            titleDirPath + '/' + coords.z + '/' + coords.x + '/' + coords.y + '.png';
        fs.writeFile(_path, binaryData, function (err) {
            if (err) {
                throw err;
            } else {
            }
        });
    });
};

ImageUtil.getImage = function (imagePath, callback) {
    fs.exists(imagePath, function (exists) {
        if (exists) {
            fs.readFile(imagePath, 'binary', function (err, file) {
                if (err) {
                    console.log(err);
                    callback(undefined);
                } else {
                    callback(file);
                }
            });
        } else callback(undefined);
    });
};