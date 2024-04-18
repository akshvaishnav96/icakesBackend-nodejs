import mongoose from 'mongoose';

const cakeFlavorSchema = new mongoose.Schema({
    cakeFlavor: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },

    description: {
        type: String,
        required: true,
        trim: true,
    },
    ingredients: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        required: true,


    }





})


export const CakeFlavor = mongoose.model('CakeFlavor', cakeFlavorSchema)