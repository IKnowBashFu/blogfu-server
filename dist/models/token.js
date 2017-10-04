'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseNamedScopes = require('mongoose-named-scopes');

var _mongooseNamedScopes2 = _interopRequireDefault(_mongooseNamedScopes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TokenSchema = _mongoose2.default.Schema({
    tokenUUID: {
        type: String,
        unique: true,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});

TokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 365 });

TokenSchema.plugin(_mongooseNamedScopes2.default);

TokenSchema.scope('exists', function (token_uuid) {
    var _this = this;

    return new Promise(function (resolve, reject) {
        _this.findOne().where('tokenUUID').equals(token_uuid).exec(function (err, queried_token) {
            if (err || queried_token === null) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
});

exports.default = _mongoose2.default.model('Token', TokenSchema);