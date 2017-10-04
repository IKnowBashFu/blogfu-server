import mongoose from 'mongoose';
import namedscopes from 'mongoose-named-scopes';

const twatSchema = mongoose.Schema({
    content: {
        type: String,
        maxlength: 255,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});

UserSchema.plugin(namedscopes);

export default mongoose.model('Twat', twatSchema);
