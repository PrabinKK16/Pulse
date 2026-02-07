import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true, 
        index: true, 
    }, 

    type: {
        type: String, 
        enum: ["habit", "expense", "focus", "note"],
        required: true, 
        index: true, 
    }, 

    title: {
        type: String, 
        required: true, 
        trim: true, 
    },

    value: {
        type: Number, 
        default: null, 
    },

    meta: {
        type: mongoose.Schema.Types.Mixed, 
        default: {}, 
    }, 

    isDeleted: {
        type: Boolean, 
        default: false, 
        index: true, 
    }, 
}, { timestamps: true });

recordSchema.index({user: 1, createdAt: -1});
recordSchema.index({user: 1, type: 1});

const Record = mongoose.model("Record", recordSchema); 
export default Record;
