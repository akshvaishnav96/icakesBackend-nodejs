import mongoose from 'mongoose';

const serving_Size_With_Price_Tier_Schema = mongoose.Schema({

    size: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cakesizes'
    },
    tier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'caketiers'
    },
    price: {
        type: Number,
        trim: true,
    }


})

export const ServingSizeWithPriceTier = mongoose.model('ServingSizeWithPriceTier', serving_Size_With_Price_Tier_Schema);

