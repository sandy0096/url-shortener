import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    id: {
        required: true,
        type: String,
    },
    shortUrl: {
        required: true,
        type: String,
    },
    origUrl: {
        required: true,
        type: String
    },
    clicks: {
        type: Number,
        required: true,
        default: 0,
    },
    expires_at: { type: Date, default: Date.now, expires: '1y' }
}, { timestamps: true });

const urlModel = mongoose.model("URL", urlSchema);

export {
    urlModel
};
