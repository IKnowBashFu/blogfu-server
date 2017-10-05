'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseNamedScopes = require('mongoose-named-scopes');

var _mongooseNamedScopes2 = _interopRequireDefault(_mongooseNamedScopes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UserSchema = (0, _mongoose.Schema)({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    displayName: {
        type: String,
        maxlength: 120
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        maxlength: 255
    },
    location: {
        type: String,
        maxlength: 120
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    role: {
        type: String,
        required: true
    },
    following: [{ type: _mongoose.Schema.Types.ObjectId, ref: 'User' }],
    blocked: [{ type: _mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});

UserSchema.plugin(_mongooseNamedScopes2.default);

exports.default = _mongoose2.default.model('User', UserSchema);