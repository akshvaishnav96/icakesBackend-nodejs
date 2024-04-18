import mongoose, { Schema } from "mongoose";

const cakeSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,

    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categorys',
        required: true
    },

    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subcategorys',
        required: true
    },
    flavor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cakeflavorwithprices"
    },
    size: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "servingsizewithpricetiers"
    },
    discount: {
        type: Number,
        trim: true,
    },
    topdeals: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'topdeals'

    }
})

export const Cake = mongoose.model('Cake', cakeSchema)