import mongoose, { Schema } from 'mongoose';
import namedscopes from 'mongoose-named-scopes';

const TokenSchema = Schema({
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

TokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60*60*24*365 });

TokenSchema.plugin(namedscopes);

TokenSchema.scope('exists', function (token_uuid) {
    return new Promise((resolve, reject) => {
        this.findOne().where('tokenUUID').equals(token_uuid).exec((err, queried_token) => {
            if (err || queried_token === null) {
                resolve(false);
            }
            else {
                resolve(true);
            }
        });
    });
});

export default mongoose.model('Token', TokenSchema);
