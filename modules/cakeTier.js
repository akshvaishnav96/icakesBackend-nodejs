import mongoose from 'mongoose';

const cakeTireSchema = new mongoose.Schema({

    tier: {
        type: Number,
        required: true,
        trim: true,
        unique: true,
    }


})

export const CakeTier = mongoose.model('CakeTier', cakeTireSchema);