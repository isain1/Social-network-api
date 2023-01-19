const { Schema, model } = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema(
    {
    reactionID: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        max_length: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtMoment) => moment(createdAtMoment).format('MM DD YYY [at] hh:mm a'),
    }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtMoment) => moment(createdAtMoment).format('MM DD YYYY [at] hh:mm a'),
        }, 
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
        },
        id: false
    }
);

const Thought = model('thought', thoughtSchema);
module.exports = Thought;