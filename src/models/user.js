import mongoose from 'mongoose';
import namedscopes from 'mongoose-named-scopes';

const UserSchema = mongoose.Schema({
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
    following: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    blocked: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});

UserSchema.plugin(namedscopes);

export default mongoose.model('User', UserSchema);
