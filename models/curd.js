var fs = require('fs');

const curd = {
    save ({model, data, callback}) {
        if (!model) {
            console.error('找不到model');
            return;
        }
        if (!data) {
            console.error('找不到数据');
            return;
        }
        var saveData = new model(data);
        console.log(`* SAVE: ${JSON.stringify(data)}`);
        saveData.save((err, doc) => {
            if (typeof callback == 'function') {
                callback(err, doc);
            }
        });
    },
    update ({model, filter = {}, data, callback}) {
        if (!model) {
            console.error('找不到model');
            return;
        }
        if (!data) {
            console.error('找不到数据');
            return;
        }
        console.log(`* UPDATE: ${JSON.stringify(filter)}/${JSON.stringify(data)}`);
        model.updateOne(filter, {$set: data}, (err, doc) => {
            if (typeof callback == 'function') {
                callback(err, doc);
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
    count ({model, filter = {}, callback}) {
        if (!model) {
            console.error('找不到model');
            return;
        }
        model.countDocuments(filter, (err, doc) => {
            if (typeof callback == 'function') 
                callback(err, doc);
        });
    },
    remove ({model, filter, callback}) {
        if (!model) {
            console.error('找不到model');
            return;
        }
        if (!filter) {
            console.error('找不到删除条件');
            return;
        }
        console.log(console.log(`* REMOVE: ${JSON.stringify(filter)}`))
        model.remove(filter, (err, doc) => {
            if (typeof callback == 'function') {
                callback(err, doc);
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
        
        curd.count({
            model, 
            filter, 
            callback: (err, count) => {
                let query = model.find(filter).select(projection).setOptions(defaultOptions);
                console.log(`* QUERY: ${JSON.stringify(filter)} / ${JSON.stringify(projection)} / ${JSON.stringify(defaultOptions)}`);
                query.exec((err, doc) => {
                    if (typeof callback == 'function') {
                        callback(err, doc, count);
                    }
                });
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