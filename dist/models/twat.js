'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseNamedScopes = require('mongoose-named-scopes');

var _mongooseNamedScopes2 = _interopRequireDefault(_mongooseNamedScopes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const twatSchema = (0, _mongoose.Schema)({
    content: {
        type: String,
        maxlength: 255,
        required: true
    },
    author: {
        type: _mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});

UserSchema.plugin(_mongooseNamedScopes2.default);

exports.default = _mongoose2.default.model('Twat', twatSchema);