import mongoose from 'mongoose';


export const fileMetadataSchema = new mongoose.Schema(
    {
        originalName: {
            type: String,
            required: true,
            trim: true
        },

        filename: {
            type: String,
            required: true,
            trim: true
        },

        path: {
            type: String,
            required: true,
            trim: true
        },

        mimeType: {
            type: String,
            required: true,
            trim: true
        },

        size: {
            type: Number,
            required: true,
            min: 0
        },

        documentType: {
            type: String,
            required: true,
            trim: true
        },

        uploadedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        _id: false
    }
);