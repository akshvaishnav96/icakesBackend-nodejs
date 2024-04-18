import mongoose, { mongo } from "mongoose";
import { SubCategory } from "../modules/SubCategory.js"

const showSubCategory = async (req, res) => {
    try {
        const data = await SubCategory.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: 'category_names'
                }

            }, {
                $addFields: {
                    category_names: {
                        $map: {
                            input: '$category_names',
                            as: 'category',
                            in: '$$category.category'
                        }
                    }
                }
            }

        ]);

        console.log(data);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
};



const uplodeSubCategory = async (req, res) => {

    try {


        const { subcategory, categoryId } = req.body;


        const alreadtExist = await SubCategory.find({ subcategory });

        if (alreadtExist.length > 0) {
            res.status(200).json({ msg: "Subcategory already exists" });
            return;
        }

        const newSubCategory = await SubCategory.create({ subcategory, category: categoryId });
        res.status(201).json({ newSubCategory, msg: "Subcategory added" });


    } catch (error) {
        res.status(400).json(error)
    }

}

const editSubCategory = async (req, res) => {


    try {
        const id = req.params.id;

        const _id = new mongoose.Types.ObjectId(id);



        const data = await SubCategory.aggregate([
            {
                $match: { _id: _id }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: 'category_names'
                }
            },
            {
                $addFields: {
                    category_names: {
                        $map: {
                            input: '$category_names',
                            as: 'category',
                            in: '$$category.category'
                        }
                    }
                }
            }
        ]);

        if (data.length > 0) {
            res.status(200).json(data[0]);
        } else {
            res.status(404).json({ msg: "subCategory not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error, msg: "An error occurred" });
    }

}

const updateSubCategory = async (req, res) => {
    try {

        const { subcategory, categoryId } = req.body




        const _id = req.params.id;

        const data = await SubCategory.findById(_id);

        if (!data) {
            return res.status(404).json({ msg: "Subcategory not found" });
        }

        if (subcategory) {
            data.subcategory = subcategory;
        }
        if (categoryId) {
            data.category = categoryId;
        }

        // Save the updated document
        await data.save();


        res.status(200).json(data);




    } catch (e) {
        res.status(400).json({ error: e });
    }
}

const deleteSubCategory = async (req, res) => {

    try {
        const _id = req.params.id;

        console.log(_id);

        const data = await SubCategory.findByIdAndDelete(_id);

        res.status(200).json({ msg: 'category successfully Deleted' });


    } catch (error) {
        res.status(400).json({ error: error })
    }
}




export { showSubCategory, uplodeSubCategory, updateSubCategory, editSubCategory, deleteSubCategory }