import mongoose from "mongoose";

import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const cakeFlavorWithPriceSchema = new mongoose.Schema({
    flavor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cakeflavors"
    },
    price: {
        type: Number,
        required: true,
        trim: true

    }


})


cakeFlavorWithPriceSchema.plugin(mongooseAggregatePaginate)

export const CakeFlavorWithPrice = mongoose.model('CakeFlavorWithPrice', cakeFlavorWithPriceSchema);