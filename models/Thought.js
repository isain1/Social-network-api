const { Schema, model } = require('mongoose');
const moment = require('moment');


const reactionSchema = new Schema(
    {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: string,
        required: true,
        max_length: 280,
    },
    username: {
        type: string,
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
        },
        id: false
    }
);

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: string,
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
            type:string,
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
module.exports = { Thought };