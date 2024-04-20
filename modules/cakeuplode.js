import mongoose, { Schema } from "mongoose";

import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

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

    subCategory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subcategorys',
        required: true
    }],
    flavor: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "cakeflavorwithprices",
        required: true
    }],
    size: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "servingsizewithpricetiers",
        required: true

    }],
    discount: {
        type: Number,
        trim: true,
    },
    topdeals: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'topdeals'

    },
    images: [{
        type: String,
        required: true,
    }
    ]
}, { timestamps: true })


cakeSchema.plugin(mongooseAggregatePaginate);

export const Cake = mongoose.model('Cake', cakeSchema)