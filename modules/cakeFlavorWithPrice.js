import mongoose from "mongoose";

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

export const CakeFlavorWithPrice = mongoose.model('CakeFlavorWithPrice', cakeFlavorWithPriceSchema);