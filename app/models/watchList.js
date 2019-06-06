const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let watchSchema = new Schema({
    issueId: {
        type: String,
        default: '',
        index: true,
        unique: true
    },
    usersId: {
        type: Array,
    },
    isNoteAvl: {
        type: Number,
        default: 0
    },
    count: {
        type: Number,
        default: 0
    }
})

mongoose.model('Watch', watchSchema)