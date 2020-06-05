var fs = require('fs');

const curd = {
    save (model, data, success, error) {
        if (!model) {
            console.error('找不到model');
            return;
        }
        if (!data) {
            console.error('找不到数据');
            return;
        }
        var saveData = new model(data);
        saveData.save((err, doc) => {
            if (err) {
                console.log(err);
                if (typeof error == 'function') {
                    error(err);
                }
            } else {
                if (typeof success == 'function') {
                    success(doc);
                }
            }
        });
    },
    update (model, filter = {}, newData, success) {
        if (!model) {
            console.error('找不到model');
            return;
        }
        if (!newData) {
            console.error('找不到数据');
            return;
        }
        model.updateOne(filter, {$set: newData}, (err, doc) => {
            if (err) {
                console.log(err);
                if (typeof error == 'function') {
                    error(err);
                }
            } else {
                if (typeof success == 'function') {
                    success(doc);
                }
            }
        });
    },
    findOne (model, filter = {}, success) {
        if (!model) {
            console.error('找不到model');
            return;
        }
        model.findOne(filter, (err, doc) => {
            if (err) {
                console.log(err);
                if (typeof error == 'function') {
                    error(err);
                }
            } else {
                if (typeof success == 'function') {
                    success(doc);
                }
            }
        });
    },
    count (model, filter = {}, success, error) {
        if (!model) {
            console.error('找不到model');
            return;
        }
        model.countDocuments(filter, (err, doc) => {
            if (err) {
                console.log(err);
                (typeof error == 'function') && error(err);
            } else {
                (typeof success == 'function') && success(doc);
            }
        });
    },
    remove (model, filter = {}, success, error) {
        if (!model) {
            console.error('找不到model');
            return;
        }
        model.remove(filter, (err, doc) => {
            if (err) {
                console.log(err);
                if (typeof error == 'function') {
                    error(err);
                }
            } else {
                if (typeof success == 'function') {
                    success(doc);
                }
            }
        });
    },
    getList ({model, filter = {}, projection = {}, options = {}, callback}) {
        if (!model) {
            console.error('找不到model');
            return;
        }
        var defaultOptions = {
            skip: 0,
            limit: 10,
            sort: {
                'updateTime': -1
            }
        }
        defaultOptions = Object.assign(defaultOptions, options);
        
        let query = model.find(filter).select(projection).setOptions(defaultOptions);
        console.log(`* QUERY: ${JSON.stringify(filter)} / ${JSON.stringify(projection)} / ${JSON.stringify(defaultOptions)}`);
        query.exec((err, doc) => {
            if (typeof callback == 'function') {
                callback(err, doc);
            }
        });
    },
    removeFile (path, success, error) {
        if (fs.existsSync(path)) {
            fs.unlink(path, (err, doc) => {
                if (err) {
                    console.log(err);
                    (typeof error == 'function') && error(err);
                } else {
                    (typeof success == 'function') && success(doc);
                }
            });
        }
    },
    renameFile (file, uploadPath, newName, success, error) {
        var tempPath = file.path;
        var ext = '.' + file.originalname.split('.')[1];
        var fileName = newName + ext;
        var filePath = uploadPath + fileName;
        fs.rename(tempPath, filePath, (err,data) => {
            if (err) {
                console.log(err);
                (typeof error == 'function') && error(err);
            } else {
                (typeof success == 'function') && success(filePath, fileName);
            }
        });
    }
}
module.exports = curd;