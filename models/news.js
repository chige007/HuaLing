var mongoose = require('./db');

var Schema = new mongoose.Schema({
    cn: {
        title: {type: String},
        content: {type: String}
    },
    en: {
        title: {type: String},
        content: {type: String}
    },
    hk: {
        title: {type: String},
        content: {type: String}
    },
    status: {
        type: Number
    },
    happenTime: {
        type: Date
    },
    createTime: {
        type: Date,
        default: Date.now
    },
    updateTime: {
        type: Date,
        default: Date.now
    }
},{
    versionKey: false,
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
});

var Model = mongoose.model('news', Schema, 'news');
module.exports = Model;