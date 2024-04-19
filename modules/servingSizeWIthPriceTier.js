import mongoose from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
const serving_Size_With_Price_Tier_Schema = mongoose.Schema({

    size: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cakesizes',
        required: true
    },
    tier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'caketiers',
        required: true
    },
    price: {
        type: Number,
        trim: true,
    }


})

serving_Size_With_Price_Tier_Schema.plugin(mongooseAggregatePaginate);

export const ServingSizeWithPriceTier = mongoose.model('ServingSizeWithPriceTier', serving_Size_With_Price_Tier_Schema);

