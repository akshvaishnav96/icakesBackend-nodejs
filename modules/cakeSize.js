import mongoose from 'mongoose';

const cakeSizeSchema = new mongoose.Schema({
    cakesize: {
        type: String,
        required: true,
        trim: true,

    },

    serving: {
        type: String,
        trim: true,

    }

})


export const CakeSize = mongoose.model('CakeSize', cakeSizeSchema)