const mongoose = require('mongoose');

const SchemaVersionSchema = new mongoose.Schema({
    version: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

SchemaVersionSchema.statics.getCurrentVersion = async function () {
    const lastVersion = await this.findOne({}).sort({date : -1}).exec();
    if (!lastVersion) {
        return 0;
    }
    return lastVersion;
}

const SchemaVersion = mongoose.model('SchemaVersion', SchemaVersionSchema);

module.exports = SchemaVersion;
