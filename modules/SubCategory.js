import mongoose from 'mongoose';

import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

const subCategorySchema = new mongoose.Schema({

    subcategory: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categorys',
        required: true,
    }



})

subCategorySchema.plugin(mongooseAggregatePaginate);

export const SubCategory = mongoose.model('SubCategory', subCategorySchema);

