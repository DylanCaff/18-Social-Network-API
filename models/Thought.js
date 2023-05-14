const { Schema, model, Types } = require("mongoose");


const reactionSchema = new Schema(
    {
        reactionId: {
            type: Types.ObjectId,
            default: new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createAt: {
            type: String,
            default: Date.now,
            get: (time) => format_data(time),
        },

    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);


const thoughtSchema = new Schema (
    {
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createAt: {
        type: Date,
        default: Date.now,
        get: (time) => format_data(time),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema], 
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }

);
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });
  
  const Thought = model('thought', thoughtSchema);

module.exports = Thought;